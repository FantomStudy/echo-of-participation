// import styles from "../../../styles/MainTablePage.module.css";
import { useEffect } from "react";
import api from "@shared/configs/axiosConfig";

export default function StudentTable() {
  useEffect(() => {
    fetchAllStudentsApi();
  }, []);

  const fetchAllStudentsApi = async () => {
    try {
      const response = await api.get("/event-journal/allStudents");
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return <div>Students</div>;
}
