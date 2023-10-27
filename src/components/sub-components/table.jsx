import { useContext } from "react";
import { useState } from "react";
import { Modal } from "react-overlays";
import { curUpdate } from "../../context";
import PropTypes from "prop-types";
function Table({ data, type, setUpdate, baseUrl }) {
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const update = useContext(curUpdate);

  function handleClose() {
    setShowModal(false);
  }

  function show(user) {
    setCurrentUser(user)
    setShowModal(true);
  }

  async function changeUser(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let user = {
      name: data.get("name"),
      age: data.get("age"),
    };
    
    let response = await fetch(`${baseUrl}/users/${currentUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (response.ok) {
      setUpdate(update + 1);
    }
  }

  async function deleteUser(event) {
    event.preventDefault();

    let response = await fetch(`${baseUrl}/users/${currentUser.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setUpdate(update + 1);
      setShowModal(false);
    } else {
      alert("Что-то пошло не так");
    }
  }

  let template = (data) => {
    if (data === null) {
      return;
    }
    return (
      <div
        key={data.id}
        className="mb-5 w-full flex flex-col items-start justify-center rounded-xl border border-solid border-[rgb(0,0,0,0.5)] p-6"
        onDoubleClick={() => show(data)}
      >
        <h3 className="font-[Gilroy] font-bold text-3xl text-left">
          {data.name}
        </h3>
        <div className="w-full flex items-center justify-between bg-[rgb(0,0,0,0.03)] p-2 rounded-lg mt-4">
          <span className="text-[rgb(0,0,0,0.5)] font-semibold">Age: </span>
          <span className="font-[Gilroy] font-semibold">{data.age}</span>
        </div>
      </div>
    );
  };

  let tableArea = data.map((item) => {
    if (type === "un25") {
      return template(item.age <= 25 ? item : null);
    } else if (type === "un50") {
      return template(item.age > 26 && item.age <= 50 ? item : null);
    } else if (type === "other") {
      return template(item.age > 50 ? item : null);
    }
  });

  return (
    <>
      {tableArea}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:outline-none"
        renderBackdrop={(props) => (
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.35)]" {...props} />
        )}
        onBackdropClick={handleClose}
      >
        <div className="bg-white p-16 rounded-xl">
          <button
            className="material-symbols-outlined absolute top-8 right-8"
            onClick={handleClose}
            type="button"
          >
            close
          </button>

          <h2 className="font-[Gilroy] font-[600] text-[38px]">Изменить</h2>
          <form
            onSubmit={(event) => changeUser(event)}
            className="flex flex-col justify-center items-center mt-8 gap-2"
          >
            <input
              type="text"
              className="placeholder:font-[Gilroy] placeholder:font-semibold placeholder:text-black font-[Gilroy] font-[600] pl-4 w-[438px] h-12 rounded-xl border-solid border-[1px] border-black focus:outline-none"
              placeholder="Имя"
              name="name"
              defaultValue={currentUser.name}
              required
            />
            <input
              type="text"
              className="placeholder:font-[Gilroy] placeholder:font-semibold placeholder:text-black font-[Gilroy] font-[600] pl-4 w-[438px] h-12 rounded-xl border-solid border-[1px] border-black focus:outline-none"
              placeholder="Возраст"
              name="age"
              defaultValue={currentUser.age}
              required
            />

            <button
              className="w-full h-12 bg rounded-xl bg-[#0047FF] text-white font-semibold font-[Gilroy]"
              type="submit"
            >
              Изменить
            </button>

            <button
              onClick={(event) => {
                deleteUser(event);
              }}
              className="w-full h-12 rounded-xl bg-[#E70000] text-white font-semibold font-[Gilroy]"
              type="button"
            >
              Удалить
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
  setUpdate: PropTypes.func,
  baseUrl: PropTypes.string
}




export default Table;
