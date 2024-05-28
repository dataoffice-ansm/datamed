// import { createContext, useContext, useMemo } from 'react';
// import type { Context, HTMLAttributes } from 'react';
// import type { ErreursMedStatistics } from '../graphql/__generated__/generated-documents';
//
// type ErreursMedStatisticsContextData = {
//     erreursMedStatistics: ErreursMedStatistics;
// };
//
// export const ErreursMedPageContext = createContext<ErreursMedStatistics>({
//     // Initialiser avec les valeurs par défaut
// });
//
// export const ErreursMedPageContextProvider = ({
//                                                   erreursMedStatistics,
//                                                   children,
//                                               }: HTMLAttributes<HTMLDivElement> & ErreursMedStatisticsContextData) => {
//     const value = useMemo(
//         () => ({
//             ...erreursMedStatistics,
//         }),
//         [erreursMedStatistics]
//     );
//     return (
//         <ErreursMedPageContext.Provider value={value}>
//             {children}
//         </ErreursMedPageContext.Provider>
//     );
// };
//
// export const useErreursMedPageContext = () => {
//     const context = useContext<ErreursMedStatistics>(
//         ErreursMedPageContext as unknown as Context<ErreursMedStatistics>
//     );
//
//     if (!context) {
//         throw new Error(
//             `${ErreursMedPageContextProvider.name} must be used within a ${ErreursMedPageContextProvider.name}.`
//         );
//     }
//
//     return context;
// };

export {};