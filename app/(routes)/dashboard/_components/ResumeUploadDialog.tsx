import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { File, Loader2Icon, Sparkles } from "lucide-react";
import { v4 as uuid4 } from "uuid";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResumeUploadDialog = ({openResumeDialog,setOpenResumeDialog}: any) => {

    const [file, setFile] = React.useState<File | null>(null);
    const router = useRouter();
    const [apiLoading,setApiLoading] = React.useState<boolean>(false);
    const onFileChange = (event:any) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("File selected:", file);
            setFile(file);
        }
    }

    const onUploadAndAnalyze = async () => {
      setApiLoading(true);
        const recordId = uuid4();
        const formData = new FormData();
        formData.append('recordId',recordId);
        if (file) {
            formData.append('resumeFile', file);
        } else {
            console.error("No file selected for upload.");
        }
        const result = await axios.post('/api/ai-resume-agent', formData)
        console.log("Result from AI Resume Agent:", result.data);
        setApiLoading(false);

        router.push(`/ai-tools/ai-resume-analyzer/${recordId}`);
      }
  return (
    <Dialog open={openResumeDialog} onOpenChange={setOpenResumeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your resume in pdf format</DialogTitle>
            <div>
              <label htmlFor="resumeUpload" className="flex items-center flex-col justify-center cursor-pointer p-7 border border-dashed rounded-xl hover:bg-slate-200">
                <File className="h-10 w-10"/>
                   {file ? <h2 className="text-blue-600 mt-3">{file?.name}</h2> : <h2 className="mt-3">Click here to upload pdf file</h2>}
              </label>
              <input type="file" id='resumeUpload' className="hidden" accept="application/pdf" onChange={onFileChange}/>
            </div>
        </DialogHeader>
        <DialogFooter>
            <Button variant={'outline'}>Cancle</Button>
            <Button onClick={onUploadAndAnalyze} disabled={!file || apiLoading}> {apiLoading?<Loader2Icon className="animate-spin"/>:<Sparkles/> }Upload & Analyze</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadDialog;
