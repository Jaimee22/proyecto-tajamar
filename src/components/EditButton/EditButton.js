import React, { Component } from "react";
import { FaEdit } from "react-icons/fa";
import './EditButton.css'

export default class EditButton extends Component {
  render() {
    return (
        <div className="centrar">
            <button className="edit-button">
                Editar <FaEdit/>
            </button>
        </div>
    );
  }
}
