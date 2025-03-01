// import { getIndustryInsights } from '@/actions/dashboard';
// import { getUserOnboardingStatus } from '@/actions/user';
// import { redirect } from 'next/navigation';
// import React from 'react'
// import DashBoardView from './_components/dashboard-view';

// const IndustryInsightsPage = async () => {

//     const { isOnboarded } = await getUserOnboardingStatus();
//     const insights = await getIndustryInsights();
//     if (!isOnboarded) {
//         redirect("/onboarding");
//     }
//     return (
//         <div className='container mx-auto'>
//             {/* client compo */}
//            <DashBoardView  insights={insights} />
//         </div>
//     )
// }

// export default IndustryInsightsPage

import { getIndustryInsights } from '@/actions/dashboard';
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react';
import DashBoardView from './_components/dashboard-view';

const IndustryInsightsPage = async () => {
  // First check if the user is onboarded
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  // Only fetch insights if the user is onboarded
  const insights = await getIndustryInsights();
  
  return (
    <div className='container mx-auto'>
      <DashBoardView insights={insights} />
    </div>
  );
};

export default IndustryInsightsPage;
