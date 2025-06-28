import { db } from './firebaseConfig';
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

export const saveMoodHistory = async (userEmail, moodData) => {
  try {
    const userDocRef = doc(db, "moodHistory", userEmail);

    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // If document exists, append to history array
      await updateDoc(userDocRef, {
        history: arrayUnion({
          mood: moodData.mood,
          preference: moodData.preference,
          language: moodData.language,
          timestamp: new Date().toISOString(),
        }),
      });
    } else {
      // If document doesn't exist, create new
      await setDoc(userDocRef, {
        history: [{
          mood: moodData.mood,
          preference: moodData.preference,
          language: moodData.language,
          timestamp: new Date().toISOString(),
        }],
      });
    }

    console.log('Mood history saved successfully!');
  } catch (error) {
    console.error('Error saving mood history:', error);
  }
};
