import {db} from "../../../lib/firebase.ts";
import {doc, setDoc} from "firebase/firestore";
import {rotateDay} from "../../../lib/workout/protocol.ts";
import type {DocumentId, WorkoutData} from "../../../lib/workout/types.ts";

export interface UploadResult {
    isSuccess: boolean;
    message?: string;
}


export const upload = async (
    userId: string,
    workout: WorkoutData,
    currentDay: DocumentId,
): Promise<UploadResult> => {

    if (!userId) {
        return {
            isSuccess: false,
            message: "Unauthorized",
        };
    }

    try {
        const docRef = doc(db, `users/${userId}`);
        const newData = {
            currentWorkout: rotateDay(currentDay),
            workouts: {
                [currentDay]: workout,
            },
        };
        await setDoc(docRef, newData, {merge: true});
        return {
            isSuccess: true,
        }
    } catch (error: unknown) {
        console.log(error);
        return {
            isSuccess: false,
            message: "Failed to upload your workout"
        }
    }
}