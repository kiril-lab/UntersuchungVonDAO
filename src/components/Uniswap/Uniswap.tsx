import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Month, Months, Year, Years } from "../../types/data";
import HauptComponent from "../HauptPropsComponent";
interface Props {
  data: any;
  quorum: string;
  threshold: string;
  votesInAlpha: ethers.Event[];
  votesInAlpha2: ethers.Event[];
  votesInBravo: ethers.Event[];
  proposalsInAlpha: ethers.Event[];
  proposalsInAlpha2: ethers.Event[];
  proposalsInBravo: ethers.Event[];
}
const Uniswap = ({
  data,
  quorum,
  threshold,
  votesInAlpha,
  votesInAlpha2,
  votesInBravo,
  proposalsInAlpha,
  proposalsInAlpha2,
  proposalsInBravo,
}: Props) => {
  if (proposalsInAlpha.length > 0) {
    const args = proposalsInAlpha.map((a) => {
      return a.args;
    });
    const proposals = args?.map((x) => {
      const proposalId = x?.id.toString();
      const proposalDescription = x?.description;
      return {
        proposalId: proposalId,
        proposalDescription: proposalDescription,
      };
    });
    //console.log(proposals);
  }
  if (proposalsInAlpha2.length > 0) {
    const args = proposalsInAlpha2.map((a) => {
      return a.args;
    });
    const proposals = args?.map((x) => {
      const proposalId = x?.id.toString();
      try {
        const proposalDescription: string = x?.description;
        return {
          proposalId: proposalId,
          proposalDescription: proposalDescription,
        };
      } catch (e) {
        return {
          proposalId: proposalId,
          proposalDescription:
            "# Upgrade Governance Contract to Compound's Governor Bravo ## Previous Discussion: [Temperature Check](https://gov.uniswap.org/t/temperature-check-upgrade-governance-contract-to-governor-bravo/13610) | [Snapshot](https://snapshot.org/#/uniswap/proposal/QmScNLeajiF2hQh1z9DYqTFKGgrRhHwrHisV4ynmDEQwxH) [Consensus Check](https://gov.uniswap.org/t/consensus-check-upgrade-governance-contract-to-governor-bravo/13707) | [Snapshot](https://snapshot.org/#/uniswap/proposal/QmWbgzHJ8nK2TDaj6LF6BxAMPahy97dMmbbU5kRBw1QkXt) ## TL;DR: Upgrade Uniswap's current governance contract from Governor Alpha to Governor Bravo to improve governance upgradability and protocol safety. [On-Chain Proposal]() ## Summary and Motivation: *Co-written with [Getty Hill](https://twitter.com/getty_hill) (@Getty), [Eddy Lee ](https://twitter.com/yesimeddy) (@elee), [Yuan Han Li ](https://twitter.com/yuan_han_li) (@yuan-han-li), [John Wang ](https://twitter.com/j0hnwang) (@johnwang), and [Ali Khambati ](https://twitter.com/alikhambati1) (@alikhambati)* Governor Alpha, the current governance contract used, was a great start, but in light of Compound's and other protocols upgrade to Governor Bravo, Uniswap should migrate given Bravo's additional safety benefits and upgradability. 1. **Native upgradeability:** Under Governor Alpha, changes to governance parameters require deploying a new contract and completely migrating to a new address. This is particularly damaging to governance participation as it introduces downtime and asynchronicity. Many governance tools and custodians use factory contracts which point to a specific contract address, meaning parties must manually upgrade their infrastructure every time governance parameters are changed under Governor Alpha. This includes tools for creating autonomous proposals like [fish.vote ](https://www.fish.vote/); front-ends such as [Tally ](https://www.withtally.com/), [Sybil](https://sybil.org/#/delegates/uniswap), and [Boardroom ](https://app.boardroom.info/) which aggregate and display governance results for various protocols; and professional custodians which are used by large token holders, delegates, and community members. Enabling a static contract address that has proxy upgradability patterns is paramount for maximizing participation, and maintaining an open and secure governance process. 2. **Voting reason string:** Governor Bravo gives voters the opportunity to add free-form comments (text strings) along with their on-chain votes. Not only does this increase the transparency around the rationale people have behind their votes, but it also facilitates more in-depth and nuanced discussion. 3. **New ���abstain' voting option:** Governor Bravo enables voters to formally abstain rather than forcing them to choose between voting yes/no or not voting at all. This will give voters more flexibility and also increase transparency into delegate behavior. 4. **Proposal numbers won't reset:** Under Governor Alpha, any upgrades to the contract resets the proposal number schema. Notice that [���Proposal 0.4'](https://app.uniswap.org/#/vote/0/4) (which resulted in deployment and migration to a new Governor Alpha contract due to modifying the proposal submission threshold parameter) caused the following on-chain proposal from @HarvardLawBFI to be numbered [���Proposal 1.1' ](https://app.uniswap.org/#/vote/1/1). Under Governor Bravo, this would not be an issue and proposal numbers would be continuous because the contract would be maintained at a single address. 5. **Proposal Cancellation:** Bravo allows user-directed cancellations enabling erroneous proposals to be canceled if need be (rather than forcing people to vote no/abstain). 6. **Review Period:** Governor Bravo allows governance to include a review/analysis period. Currently, Compound uses a 13140 block (~2-day) review period that allows holders to review the proposal. This means that users will have 2-days to prepare for voting (e.g., remove UNI from Aave), unlike Governor Alpha which instantly snapshots users' voting power. A review period substantially improves the accessibility and safety of the governance process. ## Implementation: After speaking with the OpenZeppelin team about their reimplementation of Governor Bravo, we think using Compound's Governor Bravo contract instead makes the most sense at this stage. Although Open Zeppelin's Governor contract takes a simpler approach that can include all Bravo functionality, it does not do so by default. The contract uses similar logic, but the code is new. It has gone through an internal audit and review process but still needs to go through an external audit. For the safety and simplicity of Uniswap, we think using Compound's Governor Bravo contract is the best decision for the time being. Compound's Governor contract has already undergone an [audit](https://blog.openzeppelin.com/compound-governor-bravo-audit/) by OpenZeppelin and has been widely used. We can always change/upgrade to Open Zeppelin Governor contract at a future date if their contract introduces new features/functionality the community is interested in. More details on OpenZeppelin's code can be found here: [Github](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance) [Docs](https://docs.openzeppelin.com/contracts/4.x/api/governance) [More info](https://openzeppelin.notion.site/Comparing-Compound-Governor-to-OpenZeppelin-Governor-2-10d0fdcf61ba476fae492b295822ee13) As mentioned in the previous Consensus Check, we have deployed the contract on the Ropsten test net for the community to review our code: [Governor Bravo Delegator](https://ropsten.etherscan.io/address/0x15df15caad12adaa03949014ba5cc49a84803d0f#code) [Governor Bravo Delegate](https://ropsten.etherscan.io/address/0xD8bf60dfC5115F6cB99bb50502346E7b863800f1#code) [Github for contracts](https://github.com/gettty/uniswap-gov) *NB: The `_initiate` function has been slightly modified to take an initial proposal number as an input rather than pulling it from Governor Alpha. This way Uniswap can resume proper proposal numbering.* ## Resource links: 1. [Governor Bravo Development - Protocol Development - Compound Community Forum ](https://www.comp.xyz/t/governor-bravo-development/942) 2. [Understanding Governor Bravo. A review of key changes versus��� | by monetsupply | Tally | Jul, 2021 | Medium ](https://medium.com/tally-blog/understanding-governor-bravo-69b06f1875da) 3. [Compound | Proposal Detail #42 ](https://compound.finance/governance/proposals/42) 4. [Compound | Proposal Detail #43](https://compound.finance/governance/proposals/43)",
        };
      }
    });
    console.log(proposals);
  }
  if (proposalsInBravo.length > 0) {
    const args = proposalsInBravo.map((a) => {
      return a.args;
    });
    const proposals = args?.map((x) => {
      const proposalId = x?.id.toString();
      const proposalDescription = x?.description;
      return {
        proposalId: proposalId,
        proposalDescription: proposalDescription,
      };
    });
    //console.log(proposals);
  }
  if (votesInAlpha.length > 0) {
    const args = votesInAlpha.map((a) => {
      return a.args;
    });
    const VotersAndProposalIds = args?.map((x) => {
      const voters = x?.voter;
      const proposalId = x?.proposalId.toString();
      return { voters: voters, proposalId: proposalId };
    });
    //console.log(VotersAndProposalIds);
  }
  if (votesInAlpha2.length > 0) {
    const args = votesInAlpha2.map((a) => {
      return a.args;
    });
    const VotersAndProposalIds = args?.map((x) => {
      const voters = x?.voter;
      const proposalId = x?.proposalId.toString();
      return { voters: voters, proposalId: proposalId };
    });
    //console.log(VotersAndProposalIds);
  }
  if (votesInBravo.length > 0) {
    const args = votesInBravo.map((a) => {
      return a.args;
    });
    const VotersAndProposalIds = args?.map((x) => {
      const voters = x?.voter;
      const proposalId = x?.proposalId.toString();
      return { voters: voters, proposalId: proposalId };
    });
    //console.log(VotersAndProposalIds);
  }
  const [numberProp, setNumberProp] = useState(0);
  const number_proposals = () => {
    const id = data.map((i: any) => {
      return i.id;
    });
    return id.length;
  };
  useEffect(() => {
    setNumberProp(number_proposals());
  }, []);
  return (
    <>
      {data ? (
        <HauptComponent
          title={""}
          stimmOption={0}
          quorum={quorum}
          threschold={threshold}
          allProposals={0}
          erfolgreicheP={0}
          erfolgQuote={0}
          typQuote={0}
          linkMonatlich={"/uniswap/monatlich"}
          numbVoters={0}
          linkUebersicht={"/uniswap/uebersicht"}
        />
      ) : (
        <div>Keine Daten vorhanden!</div>
      )}
    </>
  );
};
export default Uniswap;
