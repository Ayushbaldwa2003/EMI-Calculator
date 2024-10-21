document.getElementById('emiForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission and page reload

    // Call the appropriate function to calculate EMI
    cal();
});

function toggleLoanType() {
    document.getElementById('emiResult').innerText = "";
    const isEducationLoan = document.getElementById('educationLoan').checked;
    const educationLoanFields = document.getElementById('educationLoanFields');
    const normalLoanFields = document.getElementById('normalLoanFields');

    if (isEducationLoan) {
        educationLoanFields.style.display = 'block';
        normalLoanFields.style.display = 'none';
    } else {
        educationLoanFields.style.display = 'none';
        normalLoanFields.style.display = 'block';
    }
}

function cal() {
    const isEducationLoan = document.getElementById('educationLoan').checked;

    if (isEducationLoan) {
        const feesPerSemester = parseFloat(document.getElementById('feesPerSemester').value);
        const totalSemester = parseFloat(document.getElementById('totalSemester').value);
        const eduInterestRate = parseFloat(document.getElementById('eduInterestRate').value);
        const eduTenure = parseFloat(document.getElementById('eduTenure').value);

        // Calculate total loan using the formula provided
        let totalLoan = 0;
        let monthInterest = eduInterestRate / 12 / 100;
        monthInterest = monthInterest + 1;

        for (let i = 0; i < totalSemester * 6; i++) {
            if (i % 6 === 0) {
                totalLoan += feesPerSemester;
            }
            totalLoan *= monthInterest;
        }

        // Fill the calculated total loan amount into the input box
        // document.getElementById('totalLoan').value = totalLoan.toFixed(2);

        // Now calculate EMI for the education loan
        calculateEMI2(totalLoan, eduTenure, eduInterestRate,totalLoan);
    } else {
        // Calculate EMI for normal loan
        const loanAmount = parseFloat(document.getElementById('loanAmount').value);
        const loanTenure = parseFloat(document.getElementById('loanTenure').value);
        const interestRate = parseFloat(document.getElementById('interestRate').value);
        calculateEMI(loanAmount, loanTenure, interestRate);
    }
}

function calculateEMI(loanAmount, loanTenure, interestRate) {
    const monthlyInterestRate = interestRate / (12 * 100); // Monthly interest rate
    const numberOfMonths = loanTenure * 12; // Total number of months

    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
                (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    document.getElementById('emiResult').innerText = `Your EMI is: ₹${emi.toFixed(2)}`;
}
function calculateEMI2(loanAmount, loanTenure, interestRate, totalLoan) {
    const monthlyInterestRate = interestRate / (12 * 100); // Monthly interest rate
    const numberOfMonths = loanTenure * 12; // Total number of months

    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
                (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    // Use totalLoan (capital T) instead of totalloan
    document.getElementById('emiResult').innerText = `Your total loan is: ₹${totalLoan.toFixed(2)}. Your EMI is: ₹${emi.toFixed(2)}`;
}



/* 
double ans=250000;
    int years=4;
    double interest=12;
    double cal=(double)interest/12;
    cal=cal/100;
    cal=cal+1;
    for(int i=0;i<years*12;i++){
        ans=ans*cal;
    }
    double temp=1;
    for(int i=1;i<years*12;i++){
        temp=temp+Math.pow(cal,i);
    }
    System.out.println(ans);
    System.out.println((ans/temp));
    code that explains the maths in a bit more easier way
*/
