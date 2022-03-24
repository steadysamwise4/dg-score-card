import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { ADD_ROUND } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom"

function RoundConfirmModal({show, handleClose, name, dgcr_id }) {
    // const [name, setZip] = useState('');
    // const [zip, setZip] = useState('');

    const navigate = useNavigate();

    const [addRound, { rdError }] = useMutation(ADD_ROUND);

    const handleModalButton = async (e) => {
        try {
            const round = await addRound({
              variables: { courseName: name},
            });
            const roundId = round.data.addRound._id;
            console.log(roundId);
            console.log(dgcr_id);
    
            navigate(`/score/${roundId}`,{ state: { courseName: name, dgcr_id: dgcr_id} });
    
          } catch (e) {
                    console.error(e);
                  }
    }

    return (
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Start a Round at {name} ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button
              type="button"
              className="modal-button d-flex justify-content-center"
              onClick={handleModalButton}
            >
              Let's Go!
            </button>
          </Modal.Body>
          {rdError && <div>Something went wrong...</div>}
        </Modal>
      </div>
    );

}

export default RoundConfirmModal;