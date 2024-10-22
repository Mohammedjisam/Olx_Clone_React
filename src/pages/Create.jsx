import React, { Fragment } from "react";
import Header from "../Components/Header/Header";
import Create from "../Components/Create/Create";
import { FirebaseContext, AuthContext } from "../store/FirebaseContext";

const CreatePage = () => {
    return (
        <Fragment>
            <Header />
            <Create />
        </Fragment>
    );
};

export default CreatePage;
