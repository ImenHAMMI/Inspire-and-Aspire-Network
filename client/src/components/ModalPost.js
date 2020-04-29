import React from "react";
import { connect } from "react-redux";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import PersonAddRoundedIcon from "@material-ui/icons/AddRounded";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";

import { addPost } from "../js/actions/postActions";
import { isAuthorized } from "../js/actions/authActions";
import "../css/modalPost.css";

class ModalPost extends React.Component {
  state = {
    title: "",
    text: "",
    quote: "",
  };

  componentDidMount() {
    this.props.isEdit
      ? this.setState({
          Name: this.props.contact.Name,
          Mobile: this.props.contact.Mobile,
          EMail: this.props.contact.EMail,
          Img: this.props.contact.Img,
          id: this.props.contact._id,
        })
      : this.setState({
          title: "",
          quote: "",
          text: "",
        });
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = () => {
    // const isFilled = this.state.text && this.state.Mobile && this.state.EMail;
    // console.log(this.state);
    // if (isFilled) {
    // this.props.isEdit
    //   ? this.props.editContact(this.props.contact._id, this.state)
    //   :
    this.props.addPost(this.state);
    this.props.isAuthorized();
    this.props.handleOpen();
    // }
    this.setState({
      title: "",
      quote: "",
      text: "",
    });
  };

  render() {
    const { open, handleOpen, isEdit } = this.props;

    return (
      <div>
        {!isEdit ? (
          <AddRoundedIcon
            className="IconAction"
            onClick={handleOpen}
            style={{
              color: "rgba(0, 0, 0, 0.54)",
              fontSize: 60,
            }}
          />
        ) : null}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="modalForm"
          open={open}
          onClose={handleOpen}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className="modalPaper">
              <form>
                <div className="RowForm">
                  {/* <PersonRoundedIcon className="Icon" /> */}
                  <input
                    name="title"
                    placeholder="title"
                    defaultValue={this.state.title}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="RowForm">
                  {/* <PhoneRoundedIcon className="Icon" /> */}
                  <input
                    name="quote"
                    placeholder="quote"
                    defaultValue={this.state.qupte}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="RowForm">
                  {/* <EmailRoundedIcon className="Icon" /> */}
                  <input
                    name="text"
                    placeholder="text"
                    defaultValue={this.state.text}
                    onChange={this.handleChange}
                  />
                </div>
                {/* <div className="RowForm">
                  <FaceRoundedIcon className="Icon" />
                  <input
                    name="Img"
                    placeholder="Profil image"
                    defaultValue={this.state.Img}
                    onChange={this.handleChange}
                  />
                </div> */}
                {!isEdit ? (
                  <div className="btn-add" onClick={this.onSubmit}>
                    {/* <PersonAddRoundedIcon className="Icon" /> */}
                    <span>Add</span>
                  </div>
                ) : (
                  <div className="btn-add" onClick={this.onSubmit}>
                    <PersonAddRoundedIcon className="Icon" />
                    {/* <i className="fas fa-user-edit"></i> */}
                    <span>Edit</span>
                  </div>
                )}
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default connect(null, {
  addPost,
  isAuthorized,
})(ModalPost);
