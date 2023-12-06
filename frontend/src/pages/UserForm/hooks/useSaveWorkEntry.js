import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { saveWorkEntry } from "../../../service/UserService.js";
import Swal from "sweetalert2";

const useSaveWorkEntry = () => {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: ({ data, file }) => saveWorkEntry(data, file),
        onSuccess: () => {
            navigate("/home");
            Swal.fire({
                title: "Work entry saved successfully!",
                icon: "success"
            });
        },
        onError: (err) => {
            Swal.fire({
                title: "Could not save work entry.",
                icon: "error"
            });
            console.log(err);
        }
    });

    return { mutate };
};

export default useSaveWorkEntry;