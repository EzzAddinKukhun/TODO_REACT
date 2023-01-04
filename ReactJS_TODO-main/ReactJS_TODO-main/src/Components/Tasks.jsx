import React, { useEffect, useState } from "react";
import Task from "./Task";
import Swal from "sweetalert2";
import Fade from 'react-reveal/Fade';
import TableHeader from "./TableHeader";
import Modal from "./Modal";

export default function Tasks() {
  let [dataParsed, setDataParsed] = useState([]);
  let [toggle, setToggle] = useState(0);
  let [token, setToken] = useState("");

  console.log(token)

  function getDataFromLocalStorage() {
    let jsonFormatData = localStorage.getItem("Tasks");
    if (jsonFormatData != null) {
      setDataParsed(JSON.parse(jsonFormatData));
    }
  }

  function addToLocalStorage(name, assignee, startDate, endDate) {
    let dataObject = {
      name,
      assignee,
      startDate,
      endDate,
      done: 0
    };
    dataParsed.push(dataObject);
    setDataParsed(dataParsed)
    let localStorageData = JSON.stringify(dataParsed)
    localStorage.setItem("Tasks", localStorageData);
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success',

    );
    setTimeout(() => {
      window.location.reload();
    }, 1400);
  }

  function displayData() {
    return (
      dataParsed.filter((task) =>
        task.name.toLowerCase().includes(token)
      ).map((element, key) => {
        return (
          element.done == toggle ?
            < Task
              id={key}
              name={element.name}
              assignee={element.assignee}
              startDate={element.startDate}
              doneAttribute={element.done}
              setItemDone={() => setItemDone(key)}
              deleteTask={() => deleteTask(key)}
              endDate={element.endDate}
            /> : "")
      }))
  }

  function setItemDone(id) {
    dataParsed.find((element) => {
      if (dataParsed.indexOf(element) == id) {
        dataParsed[id].done = 1;
      }
      setDataParsed(dataParsed);
      let localStorageData = JSON.stringify(dataParsed)
      localStorage.setItem("Tasks", localStorageData);
      Swal.fire(
        'Good job!',
        'Task is Done Successfully!',
        'success',

      );
      setTimeout(() => {
        window.location.reload();
      }, 1400);

    })

  }


  function deleteTask(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dataParsed.find((element) => {
          if (dataParsed.indexOf(element) == id) {
            dataParsed.splice(id, 1);

          }
          setDataParsed(dataParsed);
          let localStorageData = JSON.stringify(dataParsed)
          localStorage.setItem("Tasks", localStorageData);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

          setTimeout(() => {
            window.location.reload();
          }, 1400);

        })


      }
    })

  }


  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  return (
    <>
      <Fade delay={2600}>
        <div className="tasks-container">
          <div className="tasks-table">
            <div className="controlBar">
              <div className="search-input">
                <input onChange={(e) => {

                  setToken(e.target.value);

                }} type="text" placeholder="Search"></input>
              </div>

              <div className="controlBtns">
                <button
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  type="button" class="btn btn-success">
                  <i class="fa-sharp fa-solid fa-circle"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-primary "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="tasksTable">
              <div className="tb-header text-muted">
                <TableHeader/>
              </div>
              <div id="tasksTable" className="tasks-table-container">
                {displayData()}

              </div>
            </div>
          </div>
        </div>
        </Fade>

        <Modal addToLocalStorage={addToLocalStorage}/>
      
    </>
  );
}
