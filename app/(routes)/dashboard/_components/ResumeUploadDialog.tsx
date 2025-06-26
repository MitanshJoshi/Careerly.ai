import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { File, Sparkles } from "lucide-react";
import NormalButton from "@/components/NormalButton";
import { Button } from "@/components/ui/button";

const ResumeUploadDialog = ({openResumeDialog,setOpenResumeDialog}: any) => {

    const [file, setFile] = React.useState<File | null>(null);
    const onFileChange = (event:any) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("File selected:", file);
            setFile(file);
        }
    }
  return (
    <Dialog open={openResumeDialog} onOpenChange={setOpenResumeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your resume in pdf format</DialogTitle>
            <div
            >
              <label htmlFor="resumeUpload" className="flex items-center flex-col justify-center cursor-pointer p-7 border border-dashed rounded-xl hover:bg-slate-200">
                <File className="h-10 w-10"/>

                   {file ? <h2 className="text-blue-600 mt-3">{file?.name}</h2> : <h2 className="mt-3">Click here to upload pdf file</h2>}
              </label>
              <input type="file" id='resumeUpload' className="hidden" accept="application/pdf" onChange={onFileChange}/>
            </div>
        </DialogHeader>
        <DialogFooter>
            <Button variant={'outline'}>Cancle</Button>
            <Button> <Sparkles/> Upload & Analyze</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadDialog;
