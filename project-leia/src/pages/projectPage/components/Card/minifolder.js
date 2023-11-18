import Axios from "axios";

export default function MiniFolder({ titulo, folderId, documentId }) {
  function AddToFolder() {
    Axios.post("http://projetoleia.ddns.net:3001/addtofolder", {
      folderId: folderId,
      documentId: documentId,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 500) {
          console.log(error);
        }
      });
  }

  return (
    <div className="mini-folder" onClick={() => AddToFolder()}>
      <p className="folder-title add-to">{titulo}</p>
    </div>
  );
}
