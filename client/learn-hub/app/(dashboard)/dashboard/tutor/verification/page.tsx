"use client";

import { useEffect, useState } from "react";
import {
  DashboardSection,
  DashboardSectionContent,
  DashboardSectionHeader,
} from "../../_components/dashboard-section";
import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import {
  createTutor,
  getMineTutor,
  getMineTutorCV,
  putTutorCV,
} from "@/actions/tutors";
import { toast } from "react-toastify";
import { Activity } from "lucide-react";

const Verification = () => {
  const [cv, setCV] = useState<File>();
  const [tutorCV, setTutorCV] = useState<TutorCV>();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [tutor, setTutor] = useState<Tutor>();
  useEffect(() => {
    getMineTutor().then((res) => {
      if (res) {
        if (res.status == 200) {
          setTutor(res.data.tutor);
        }
      }
      getMineTutorCV().then((res) => {
        if (res) {
          if (res.status == 200) {
            setTutorCV(res.data.tutorCV);
          }
        }
      });
      setIsLoading(false);
    });
  }, [isUploading]);
  if (isLoading)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Loading...</p>
      </div>
    );

  return (
    <DashboardSection>
      <DashboardSectionHeader icon={Activity}>Verification status</DashboardSectionHeader>

      <DashboardSectionContent>
        <div className="flex">
          <div className="relative">
            <div className="absolute top-0 w-full flex flex-col items-center">
              {tutor === undefined ? (
                <>
                  <p className="font-bold text-sky-500 text-4xl">
                    Become our tutors now
                  </p>
                  <p className="">Start by uploading your CV</p>
                </>
              ) : tutor.verified || (tutorCV && tutorCV.status === "PASSED") ? (
                <>
                  <p className="font-bold text-lime-500 text-4xl">
                    You have been verified
                  </p>
                  <p className="">
                    We are looking forward to what you can offer for our
                    students
                  </p>
                </>
              ) : !tutorCV ? (
                <>
                  <p className="font-bold text-sky-500 text-4xl">
                    Please submit your CV
                  </p>
                  <p className="">Uploading your CV</p>
                </>
              ) : tutorCV.status === "PENDING" ? (
                <>
                  <p className="font-bold text-slate-500 text-4xl">
                    Your CV is waiting for verification
                  </p>
                  <p className="">
                    We will inform you about your verification as soon as
                    possible
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold text-red-500 text-4xl">
                    Your CV has been refused
                  </p>
                  <p className="">
                    Please uploadng another CV if you still want to be verified
                  </p>
                </>
              )}
            </div>
            <img src="/images/tutor-verification.svg" />
          </div>
          {!(
            (tutor && tutor.verified) ||
            (tutorCV && tutorCV.status === "PASSED")
          ) && (
            <div className="w-1/2 flex space-x-2 items-center">
              <form
                className="flex flex-col space-x-2 items-center mx-auto"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (cv) {
                    setIsUploading(true);
                    let res;
                    if (tutor === undefined) {
                      res = await createTutor(cv);
                    } else {
                      res = await putTutorCV(cv);
                    }
                    if (res) {
                      if (res.status == 201 || res.status == 200) {
                        toast.success(res.data.message);
                      } else {
                        toast.error(res.data.message);
                      }
                    }
                    setIsUploading(false);
                  }
                }}
              >
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                >
                  Upload CV
                  <input
                    className="w-0"
                    type="file"
                    accept=".zip,.rar,.7zip"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length)
                        setCV(e.target.files[0]);
                    }}
                  />
                  {cv && (
                    <div className="ml-3 pl-3 border-l-white border-l-2">
                      {cv.name}
                    </div>
                  )}
                </Button>
                <Button className="mt-2">
                  <input className="text-lg" type="submit" />
                </Button>
              </form>
            </div>
          )}
        </div>
      </DashboardSectionContent>
    </DashboardSection>
  );
};

export default Verification;
