import React from "react";
import { connect } from "react-redux";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { editAvatar } from "../js/actions/authActions";

class ModalImg extends React.Component {
  arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  submitImgProfile = () => {
    this.props.editAvatar(this.props.imgProfile);
    this.props.handleOpen();
  };

  render() {
    const { open, imgProfile } = this.props;
    const base64Flag = "data:image/jpeg;base64,";
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modalForm"
        open={open}
        onClose={this.props.handleCloseImg}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modalPaper">
            <div className="RowForm">
              {imgProfile ? (
                // <div className="RowForm">
                <img
                  style={{ width: 400, height: 300 }}
                  src={
                    base64Flag +
                    this.arrayBufferToBase64(imgProfile.img.data.data)
                  }
                />
              ) : null}
            </div>
            <button type="submit" onClick={this.submitImgProfile}>
              Save
            </button>
            {/* </div> */}
          </div>
        </Fade>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  imgProfile: state.authReducer.imgProfile,
});
export default connect(mapStateToProps, { editAvatar })(ModalImg);
