import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import {useState, useEffect, useContext } from "react";
import * as api from "../../Utils/Api.js";
import PackingListCard from "../PackingListCard/PackingListCard.js";
import { checkLoggedIn } from "../../Utils/token.js";
import "./PackingListList.css";


const PackingListList = (props) => {
    const { onOpenCreatePackingListModal} = props;
    const onSelectedPackingList = props.onSelectedPackingList;
    const currentUser= useContext(CurrentUserContext);
    const [packingLists, setPackingLists] = useState([]);
  

    useEffect(() => {
        fetchPackingLists();
    }, []);

    const fetchPackingLists = async () => {
        try {
            const token = checkLoggedIn();
            if(!token) {
                console.error("No token found. User might not be logged in.");
                return;
            }
            const data = await api.getPackingLists(token);
            setPackingLists(data);
        } catch (error) {
            console.error("Error fetching packing lists: ", error);
            if (error.message.includes("401")) {
                console.error("Unauthorized access. Please check your login status.");
            }
        }
    };

    const handleCreatePackingListSuccess = (newPackingList) => {
        //when a new packing list is created, add it to the list and close the modal.
        setPackingLists([newPackingList, ...packingLists]);
        setIsCreateModalOpen(false);
    };

    const handleDeletePackingList = async (packingListId) => {
        try{
            await api.deletePackingList(packingListId);
            setPackingLists(packingLists.filter(list => list.id !== packingListId));
        } catch (error) {
            console.error("Error deleting packing list: ", error);
        }
    };

    return (
        <div className="packing-list-list">
            <h2>My Packing Lists</h2>
            <button onClick={onOpenCreatePackingListModal}>
                Create New Packing List
            </button>

            {packingLists.length > 0 ? (
                <ul className="card-list">
                    {packingLists.map(list => (
                        // console.log("PackingListList - Rendering PackingListCard with packingList: ", list),
                        <PackingListCard
                        key={list.id}
                        packingList={list}
                        onSelectedPackingList={props.onSelectedPackingList}
                        />
                    ))}
                </ul>
            ) : (
                <p>You have no packing lists yet. Create on to get started!</p>
            )}
        </div>
    );
};

export default PackingListList;