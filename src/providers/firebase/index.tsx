import React, {
  useState,
  useEffect,
  PropsWithChildren,
  createContext,
  useContext
} from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { Song, Vote, VoteType } from "~/domains";

var firebaseConfig = {
  apiKey: "AIzaSyDelXDWyc33yNs8HXp0uJwA-rXtH4p96O4",
  authDomain: "soundstorming-tests.firebaseapp.com",
  databaseURL: "https://soundstorming-tests.firebaseio.com",
  projectId: "soundstorming-tests",
  storageBucket: "",
  messagingSenderId: "1076629696223",
  appId: "1:1076629696223:web:e65c3e245e9fd24da1836a"
};
firebase.initializeApp(firebaseConfig);

const storageContext = createContext<{
  songs: Song[];
  votes: Vote[];
  postVote: (vote: Vote) => void;
  updateVote: (vote: Vote) => void;
}>({
  songs: [],
  votes: [],
  postVote: () => {},
  updateVote: () => {}
});

export function useStorage() {
  return useContext(storageContext);
}

interface Props {}
interface State {
  isLoading: boolean;
  songs: Song[];
}

export function StorageProvider({ children }: PropsWithChildren<Props>) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  function pullSongs() {
    console.log("Called pull...");

    var database = firebase.database();

    // var userId = firebase.auth().currentUser.uid;
    // try {
    setIsLoading(true);
    var allSongsSnapshot = database.ref("/songs/byId").once("value");
    allSongsSnapshot.then(snapshot => {
      console.log("Pulled...");
      console.log(snapshot.val());
      var results = snapshot.val();

      var allSongs: Song[] = [];
      for (var key in results) {
        console.log(key);
        var val = results[key] as Song;
        console.log(val);
        allSongs.push(val);
      }
      {
      }
      console.log("parsed:");
      console.log(allSongs);

      setSongs(allSongs);
      setIsLoading(false);
    });
  }

  function observeVotes() {
    const database = firebase.database();
    const votesRef = database.ref("votes/byUserId/1");
    votesRef.on("value", snapshot => {
      const resultsDir = snapshot.val();

      var allVotes: Vote[] = [];
      for (var key in resultsDir) {
        const val = resultsDir[key];
        const newVote: Vote = val;
        newVote.id = key;
        allVotes.push(newVote);
      }

      setVotes(allVotes);
    });
  }

  function postVote(vote: Vote) {
    const database = firebase.database();

    const addVote = database
      .ref("votes/byUserId/1")
      .push()
      .set({
        songId: vote.songId,
        type: vote.type
      })
      .then(snapshot => {
        console.log("Did post vote.");
      });
    return addVote;
  }

  function updateVote(vote: Vote) {
    const database = firebase.database();
    const updateVote = database
      .ref(`votes/byUserId/1/${vote.id}`)
      .set({
        id: vote.id,
        songId: vote.songId,
        type: vote.type
      })
      .then(snapshot => {
        console.log("Did update vote.");
      });
    return updateVote;
  }

  useEffect(() => {
    pullSongs();
    observeVotes();
  }, []);

  return (
    <storageContext.Provider value={{ songs, votes, postVote, updateVote }}>
      {children}
    </storageContext.Provider>
  );
}
