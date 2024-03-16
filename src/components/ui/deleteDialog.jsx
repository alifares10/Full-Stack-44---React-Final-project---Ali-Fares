import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/Button";

const DeleteDialog = ({ callback, type }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-red-800 lg:h-[200px] flex flex-col items-center justify-between ">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to Delete {type}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-start items-start">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={callback}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
