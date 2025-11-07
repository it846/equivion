"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(5);
  const [tenureType, setTenureType] = useState<"years" | "months">("years");

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate EMI
  useEffect(() => {
    const calculateEMI = () => {
      const principal = loanAmount;
      const ratePerMonth = interestRate / 12 / 100;
      const tenureInMonths = tenureType === "years" ? tenure * 12 : tenure;

      if (principal && ratePerMonth && tenureInMonths) {
        const emiValue =
          (principal *
            ratePerMonth *
            Math.pow(1 + ratePerMonth, tenureInMonths)) /
          (Math.pow(1 + ratePerMonth, tenureInMonths) - 1);

        const totalAmountValue = emiValue * tenureInMonths;
        const totalInterestValue = totalAmountValue - principal;

        setEmi(Math.round(emiValue));
        setTotalInterest(Math.round(totalInterestValue));
        setTotalAmount(Math.round(totalAmountValue));
      }
    };

    calculateEMI();
  }, [loanAmount, interestRate, tenure, tenureType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const maxTenure = tenureType === "years" ? 30 : 360;
  const principalPercentage = ((loanAmount / totalAmount) * 100).toFixed(1);
  const interestPercentage = ((totalInterest / totalAmount) * 100).toFixed(1);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-lg shadow-lg">
          <Calculator className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">EMI Calculator</h2>
          <p className="text-gray-600">Calculate your monthly loan payments</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Side - Inputs */}
        <div className="space-y-8">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between mb-3">
              <label className="text-gray-700 font-semibold">Loan Amount</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-32 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-right font-semibold text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full slider"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>₹10K</span>
              <span>₹1 Cr</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between mb-3">
              <label className="text-gray-700 font-semibold">Interest Rate (% p.a.)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                step="0.1"
                className="w-32 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-right font-semibold text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
              />
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full slider"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>5%</span>
              <span>25%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between mb-3">
              <label className="text-gray-700 font-semibold">Loan Tenure</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-20 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-right font-semibold text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                />
                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value as "years" | "months")}
                  className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-semibold text-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max={maxTenure}
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full slider"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>1 {tenureType === "years" ? "Yr" : "Mo"}</span>
              <span>{maxTenure} {tenureType === "years" ? "Yrs" : "Mos"}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Results */}
        <div className="space-y-6">
          {/* EMI Result */}
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
            <p className="text-teal-50 mb-2">Monthly EMI</p>
            <p className="text-4xl font-bold">{formatCurrency(emi)}</p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p className="text-gray-600 text-sm mb-1">Principal Amount</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(loanAmount)}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <p className="text-gray-600 text-sm mb-1">Total Interest</p>
              <p className="text-xl font-bold text-orange-600">{formatCurrency(totalInterest)}</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
            <p className="text-gray-600 text-sm mb-1">Total Amount Payable</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
          </div>

          {/* Visual Chart */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <p className="text-gray-700 font-semibold mb-4">Payment Breakdown</p>

            {/* Horizontal Bar Chart */}
            <div className="h-12 flex rounded-lg overflow-hidden mb-4 shadow-sm">
              <div
                className="bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white text-sm font-semibold"
                style={{ width: `${principalPercentage}%` }}
              >
                {parseFloat(principalPercentage) > 15 && `${principalPercentage}%`}
              </div>
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-sm font-semibold"
                style={{ width: `${interestPercentage}%` }}
              >
                {parseFloat(interestPercentage) > 15 && `${interestPercentage}%`}
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded"></div>
                  <span className="text-sm text-gray-700">Principal</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
                  <span className="text-sm text-gray-700">Interest</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(totalInterest)}</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-4 rounded-lg font-semibold transition shadow-lg hover:shadow-xl">
            Apply for Loan
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-4 bg-teal-50 border border-teal-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-teal-600">Note:</span> The EMI calculation is indicative and based on standard formulas.
          Actual EMI may vary based on processing fees, insurance, and other charges. Please contact us for accurate quotes.
        </p>
      </div>
    </div>
  );
}
