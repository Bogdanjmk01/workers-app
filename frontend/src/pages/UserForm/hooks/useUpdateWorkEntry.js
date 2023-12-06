import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { updateWorkEntry } from "../../../service/UserService.js";

const useUpdateWorkEntry = (id) => {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: (data) => updateWorkEntry(id, data),
        onSuccess: () => {
            navigate("/home");
            Swal.fire({
                title: "Work entry updated successfully!",
                icon: "success"
            });
        },
        onError: () => {
            Swal.fire({
                title: "Work entry could not be updated!",
                icon: "error"
            });
        }
    });

    return { mutate };
};

export default useUpdateWorkEntry;