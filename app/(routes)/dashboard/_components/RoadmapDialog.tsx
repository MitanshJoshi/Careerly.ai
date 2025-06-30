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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 } from "uuid";
import { LoaderCircle, Sparkle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RoadmapDialog = ({
  openDialog,
  setRoadmapDialogOpen,
}: {
  openDialog: boolean;
  setRoadmapDialogOpen: (open: boolean) => void;
}) => {

  const [userInp, setUserInp] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const GenerateRoadmap = async() =>{
    setLoading(true);
    const roadmapId = v4();
    try {
      const result = await axios.post(`/api/ai-roadmap-agent/`,{
        roadmapId:roadmapId,
        userInput: userInp 
      })
      console.log("Roadmap generated:", result.data);
      router.push(`/ai-tools/career-roadmap-generator/${roadmapId}`)
    } catch (error) { 
      setLoading(false);
      console.error("Error generating roadmap:", error);
      return;
    }
    setLoading(false);
  }

  return (
    <Dialog  open={openDialog} onOpenChange={setRoadmapDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter position/skills to generate roadmap</DialogTitle>
          <DialogDescription>
                <Input  onChange={(e)=>setUserInp(e.target.value)} className="mt-2" placeholder="e.g Full Stack Developer"/>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button variant={'outline'}>
                Cancel
            </Button>
            <Button disabled={!userInp || loading} onClick={GenerateRoadmap}>
               {loading ? <LoaderCircle className="animate-spin"/> : <Sparkle/>} Generate Roadmap
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoadmapDialog;
