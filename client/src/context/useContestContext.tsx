import { useState, useContext, createContext, FC, useEffect, useCallback } from 'react';
import { ContestAPIData } from '../interface/Contest';
import { AuthContext } from './useAuthContext';
import { getUserContests } from '../helpers/APICalls/contest';

interface IContestContext {
  activeContests: ContestAPIData[];
  inactiveContests: ContestAPIData[];
  updateContests: (contests: ContestAPIData[]) => void;
}

export const ContestContext = createContext<IContestContext>({
  activeContests: [],
  inactiveContests: [],
  updateContests: () => null,
});

export const ContestProvider: FC = ({ children }): JSX.Element => {
  const [activeContests, setActiveContests] = useState<ContestAPIData[]>([]);
  const [inactiveContests, setInactiveContests] = useState<ContestAPIData[]>([]);
  const { loggedInUser } = useContext(AuthContext);

  const updateContests = useCallback((contests: ContestAPIData[]) => {
    const active = [];
    const inactive = [];
    for (const contest of contests) {
      if (new Date(contest.deadline) > new Date()) {
        active.push(contest);
      } else {
        inactive.push(contest);
      }
    }
    setActiveContests(active);
    setInactiveContests(inactive);
  }, []);

  useEffect(() => {
    const getContests = async () => {
      const response = await getUserContests();
      if (response.success) {
        if (response.contests) {
          updateContests(response.contests);
        }
      }
    };
    if (loggedInUser) {
      getContests();
    }
  }, [updateContests, loggedInUser]);

  return (
    <ContestContext.Provider value={{ activeContests, inactiveContests, updateContests }}>
      {children}
    </ContestContext.Provider>
  );
};

export function useContest(): IContestContext {
  return useContext(ContestContext);
}
