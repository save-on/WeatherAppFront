import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import { useState, useEffect, useContext } from "react";
import * as api from "../../Utils/Api.js";
import PackingListCard from "../../Components/PackingListCard/PackingListCard.js";
import { checkLoggedIn } from "../../Utils/token.js";
import PackingListDetailsModal from "../../Components/PackingListDetailsModal/PackingListDetailsModal.js";
import "./PackingListList.css";
import BackButton from "../../Components/BackButton/BackButton.jsx";
import { useLocation } from "react-router";

const PackingListList = (props) => {
  const {
    onOpenCreatePackingListModal,
    selectedPackingList,
    isPackingListModalOpen,
    closePackingListModal,
    handlePackingListDeleted,
    onSelectedPackingList,
    packingLists,
  } = props;

  const currentUser = useContext(CurrentUserContext);
  const location = useLocation().pathname;

  // useEffect(() => {
  //   fetchPackingLists();
  // }, []);

  // const fetchPackingLists = async () => {
  //   try {
  //     const token = checkLoggedIn();
  //     if (!token) {
  //       console.error("No token found. User might not be logged in.");
  //       return;
  //     }
  //     const data = await api.getPackingLists(token);
  //     setPackingLists(data);
  //   } catch (error) {
  //   }
  // };

  return (
    <div className="packinglist__list">
      {location !== "/profile" && (
        <div className="packinglist__back-button">
          <BackButton type="prev" />
        </div>
      )}
      <div className="packinglist__header">
        <h2 className="packinglist__header-text">My Packing Lists</h2>
        <button
          onClick={onOpenCreatePackingListModal}
          className="packinglist__create-button"
        >
          Create New Packing List
        </button>
      </div>

      {packingLists && packingLists.length > 0 ? (
        <ul className="card-list">
          {packingLists.map((list) => (
            <PackingListCard
              key={list.id}
              packingList={list}
              onSelectedPackingList={props.onSelectedPackingList}
            />
          ))}
        </ul>
      ) : (
        <p className="packinglist__message">
          You have no packing lists yet. Create one to get started!
        </p>
      )}
      {isPackingListModalOpen && (
        <PackingListDetailsModal
          packingList={selectedPackingList}
          onClose={closePackingListModal}
          onSelectedPackingList={onSelectedPackingList}
          handlePackingListDeleted={handlePackingListDeleted}
        />
      )}
    </div>
  );
};

export default PackingListList;
