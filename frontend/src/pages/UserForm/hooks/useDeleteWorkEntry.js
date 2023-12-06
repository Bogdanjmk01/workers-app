import { useMutation } from "@tanstack/react-query";
import { deleteWorkEntry } from "../../../service/UserService.js";
import Swal from "sweetalert2";

const useDeleteWorkEntry = () => {
    const { mutate } = useMutation({
        mutationFn: (id) => deleteWorkEntry(id),
        onSuccess: () => {
            Swal.fire({
                title: "Work entry deleted successfully!",
                icon: "success"
            });
            window.location.reload();
        },
        onError: () => {
            Swal.fire({
                title: "Work entry could not be deleted!",
                icon: "error"
            });
        }
    });

    return { mutate };
};

export default useDeleteWorkEntry;