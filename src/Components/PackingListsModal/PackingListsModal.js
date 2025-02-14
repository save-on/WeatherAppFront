import { useContext, useEffect } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useFormValidator } from "../../hooks/useFormValidator";

const PackingListsModal = ({ onClose, updateUser, isLoading }) => {
    const currentUser = useContext(CurrentUserContext);

    const { values, handleChanges, setValues } = useForm({
        name: "",
        weatherType: "",
        location: "",
    });

    const { formRef, errors, isDisabled } = useFormValidator(values);
    
    //This needs to change for the packing list not the user
    const onSubmit = (e)=> {
        e.preventDefault();
        updateUser(values)
    };

    useEffect(() => {
        setValues(currentUser);
    }, [currentUser]);

    return(
        <ModalWithForm
        name="edit-packing-lists"
        title="Create a packing list"
        onClose={onClose}
        buttonText="Save Packing List"
        onSubmit={onSubmit}
        formRef={formRef}
        >
        </ModalWithForm>
    ) 

}

export default PackingListsModal;