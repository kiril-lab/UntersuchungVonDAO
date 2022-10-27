import { useEffect, useMemo, useState } from "react";
import {
  NumberUnterschidlischeVotes,
  AllBlockNumbers_CreateProposalEvent,
  allExecutedProposalEvent,
} from "../../lib/constUniswap";
import { Quote } from "../../lib/functions";
import HauptPropsComponent from "../HauptPropsComponent";
interface Props {
  quorum: string;
  threshold: string;
}
const Uniswap = ({ quorum, threshold }: Props) => {
  const [number, setNumber] = useState(0);
  const [numberExecuted, setNumberExecuted] = useState(0);
  const [numberVoters, setNumberVoters] = useState(0);

  const getNumber = () => {
    const number = AllBlockNumbers_CreateProposalEvent.length;
    return number;
  };
  const erfolgQuote = useMemo(() => {
    if (number && numberExecuted) {
      return Quote(number, numberExecuted);
    }
  }, [number, numberExecuted]);
  useEffect(() => {
    setNumber(getNumber());
    setNumberExecuted(allExecutedProposalEvent);
    setNumberVoters(NumberUnterschidlischeVotes);
  }, []);

  return (
    <HauptPropsComponent
      title={"Uniswap DAO"}
      stimmOption={"3 (Ja, Nein, Enthalten)"}
      quorum={quorum ? quorum : "Loading..."}
      threschold={threshold ? threshold : "Loading..."}
      allProposals={number ? number : "Loading..."}
      erfolgreicheP={numberExecuted ? numberExecuted : "Loading..."}
      erfolgQuote={erfolgQuote ? erfolgQuote : "Loading..."}
      linkErfolgsNachTyp={"/uniswap/erfolgsNachTyp"}
      linkMonatlich={"/uniswap/monatlich"}
      numbVoters={numberVoters}
      linkUebersicht={"/uniswap/uebersicht"}
      classInfo={"infoUniswap"}
    />
  );
};
export default Uniswap;
