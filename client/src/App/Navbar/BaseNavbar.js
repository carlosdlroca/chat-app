import React from "react";
import { Navbar, NavLinks } from "./Styles";

export default function BaseNavbar(props) {
    return (
        <Navbar>
            <NavLinks>{props.children}</NavLinks>
        </Navbar>
    );
}
