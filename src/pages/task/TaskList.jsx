import React, { useEffect, useState } from "react";
import {
  useStatusChangeMutation,
  useStartTaskactionMutation,
  useStopTaskactionMutation,
} from "../../redux/services/TaskService";
// import { useEditable } from "@chakra-ui/react";

const TimeDifference = ({ startTime, endTime }) => {
  const getDifference = (start, end) => {
    const differenceInMs = end - start;

    // Convert to seconds, minutes, and hours
    const seconds = (differenceInMs / 1000).toFixed(3);
    const minutes = (differenceInMs / (1000 * 60)).toFixed(3);
    const hours = (differenceInMs / (1000 * 60 * 60)).toFixed(6);

    return { seconds, minutes, hours };
  };

  const { seconds, minutes, hours } = getDifference(startTime, endTime);

  return (
    <div>
      <h2>Time Difference</h2>
      <p>
        <strong>Start Time:</strong> {startTime}
      </p>
      <p>
        <strong>End Time:</strong> {endTime}
      </p>
      <p>
        <strong>Difference in Seconds:</strong> {seconds} sec
      </p>
      <p>
        <strong>Difference in Minutes:</strong> {minutes} min
      </p>
      <p>
        <strong>Difference in Hours:</strong> {hours} hr
      </p>
    </div>
  );
};

const TaskList = () => {
  const [statusChange, { isLoading }] = useStatusChangeMutation();

  const [startTaskaction, { isLoading: istaskstart }] =
    useStartTaskactionMutation();

  const [stopTaskaction, { isLoading: istaskstop }] =
    useStopTaskactionMutation();

  const [tasks, setTasks] = useState([]);
  const [visibleRowIds, setVisibleRowIds] = useState({}); // Track the row ID with the visible button

  const startTask = async (id, task_id) => {
    setVisibleRowIds((prevVisible) => ({
      ...prevVisible,
      [task_id]: prevVisible[task_id] ? null : { task_id }, // Set or remove the nested `id` key dynamically
    }));
    console.log(id, task_id);
    const startdata = await startTaskaction({ list_id: id });
  };

  const stopTask = async (id, task_id, stopaction) => {
    if (stopaction === undefined) {
      const stopdata = await stopTaskaction({ list_id: id });
      const duration = {
        start: stopdata?.data?.data?.data?.start,
        end: stopdata?.data?.data?.data?.end,
      };
      setVisibleRowIds((prevVisible) => ({
        ...prevVisible,
        [task_id]: {
          ...prevVisible[task_id],
          task_id, // Keep the id
          duration, // Add or update the duration
        },
      }));
    }
  };

  const toMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  useEffect(() => {
    const updateStatus = async () => {
      try {
        const data = await statusChange();
        setTasks(data?.data?.data?.tasks);
      } catch (err) {
        console.error("Error changing status:", err);
      }
    };

    updateStatus(); // Trigger the status change function when the component mounts
  }, []);

  const formatTimestamp = (timestamp) => {
    try {
      // Ensure timestamp is valid and in milliseconds
      const date = new Date(Number(timestamp)); // Convert to a valid number
      if (isNaN(date.getTime())) {
        throw new Error("Invalid timestamp");
      }

      return date.toISOString().replace("T", " ").slice(0, 19); // Format as "YYYY-MM-DD HH:mm:ss"
    } catch (error) {
      console.error("Error formatting timestamp:", error.message);
      return "Invalid Date";
    }
  };

  return (
    <section className="w-full bg-gray-100 py-8">
      <div className="mx-[10%] bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold">
          Clickup api task start and task stop functionality{" "}
        </h1>
        <p className="text-gray-600">
          ClickUp is a project management software company that provides an
          all-in-one platform to improve workplace efficiency and collaboration.
          The platform's features include tasks, chat, whiteboards, spreadsheets
        </p>
        <ul>
          {tasks &&
            tasks !== undefined &&
            tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between py-5 m-5 border rounded-lg ${
                  task.completed ? "bg-green-100" : "bg-white"
                }`}
              >
                <span>
                  {task.name} {task.team_id} {task.id}
                </span>
                <span>{task.description}</span>
                <span>{formatTimestamp(task.date_created)}</span>
                {visibleRowIds[task.id] !== undefined &&
                visibleRowIds[task.id]?.task_id ? (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={(e) =>
                      stopTask(
                        task.team_id,
                        task.id,
                        visibleRowIds[task.id]?.duration
                      )
                    }
                  >
                    {visibleRowIds[task.id]?.duration === undefined ? (
                      "Stop"
                    ) : (
                      <TimeDifference
                        startTime={visibleRowIds[task.id]?.duration?.start}
                        endTime={visibleRowIds[task.id]?.duration?.end}
                      />
                    )}
                  </button>
                ) : (
                  <></>
                )}
                <button
                  onClick={() => startTask(task.team_id, task.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded "
                >
                  start
                </button>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default TaskList;
