
import React from "react";
import ColdEmailGeneratorPage from "./_component/coldemail-generator";
export default async function coldEmailPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">
        Draft An Impressive Cold Email Using CoachAI
        </h1>
      </div>
      <ColdEmailGeneratorPage/>
      
     
        
    </div>
  );
}