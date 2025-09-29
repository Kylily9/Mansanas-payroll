const positions = [
  "Chief Information Officer", "Chief Technology Officer", "Systems Development Manager",
  "IT Director", "Product Manager", "Technical Lead", "IT Operations Manager", "Project Manager",
  "IT Manager", "Systems Engineer", "System Administrator", "Network Administrator",
  "Database Administrator", "IT Support Specialist", "Web Developer", "Software Developer",
  "Front-End Developer", "Back-End Developer", "Full-Stack Developer", "Data Analyst",
  "Cybersecurity Specialist", "QA Tester", "UI/UX Designer", "Cloud Engineer", "Technical Support Engineer"
];

const positionInput = document.getElementById("position");
const positionList = document.getElementById("positionList");

positionInput.addEventListener("input", () => {
  const input = positionInput.value.toLowerCase();
  positionList.innerHTML = "";
  if (input === "") {
    positionList.style.display = "none";
    return;
  }
  const filtered = positions.filter(pos => pos.toLowerCase().includes(input));
  if (filtered.length > 0) {
    positionList.style.display = "block";
    filtered.forEach(pos => {
      const div = document.createElement("div");
      div.textContent = pos;
      div.onclick = () => {
        positionInput.value = pos;
        positionList.style.display = "none";
      };
      positionList.appendChild(div);
    });
  } else {
    positionList.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  if (!positionList.contains(e.target) && e.target !== positionInput) {
    positionList.style.display = "none";
  }
});

document.getElementById("payrollForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const empID = document.getElementById("empID").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const middleName = document.getElementById("middleName").value.trim();
  const position = document.getElementById("position").value.trim();
  const dailyRate = parseFloat(document.getElementById("dailyRate").value.trim());
  const workDays = parseFloat(document.getElementById("workDays").value.trim());
  const warning = document.getElementById("warning");

  if (!/^\d+$/.test(empID)) return warning.textContent = "⚠ Employee ID must be a number!";
  if (!lastName || !firstName || !position || isNaN(dailyRate) || isNaN(workDays))
    return warning.textContent = "⚠ Please fill in all required fields!";
  if (workDays <= 0 || workDays > 31)
    return warning.textContent = "⚠ Work days must be between 1 and 31!";

  warning.textContent = "";

  const grossPay = dailyRate * workDays;
  const sss = grossPay * 0.05;
  const pagibig = grossPay * 0.03;
  const philhealth = grossPay * 0.02;
  const tax = grossPay * 0.05;
  const totalDeduction = sss + pagibig + philhealth + tax;
  const netPay = grossPay - totalDeduction;
  const date = new Date().toLocaleDateString();

  const formatMoney = num => num.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById("form-page").style.display = "none";
  const summary = document.getElementById("summaryDetails");
  summary.innerHTML = `
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Employee ID:</strong> ${empID}</p>
    <p><strong>Name:</strong> ${firstName} ${middleName ? middleName + " " : ""}${lastName}</p>
    <p><strong>Position:</strong> ${position}</p>
    <p><strong>Daily Rate:</strong> ₱${formatMoney(dailyRate)}</p>
    <p><strong>Total Days Worked:</strong> ${workDays}</p>
    <p><strong>Gross Pay:</strong> ₱${formatMoney(grossPay)}</p>
    <p><strong>SSS (5%):</strong> ₱${formatMoney(sss)}</p>
    <p><strong>Pag-IBIG (3%):</strong> ₱${formatMoney(pagibig)}</p>
    <p><strong>PhilHealth (2%):</strong> ₱${formatMoney(philhealth)}</p>
    <p><strong>Tax (5%):</strong> ₱${formatMoney(tax)}</p>
    <p><strong>Total Deductions:</strong> ₱${formatMoney(totalDeduction)}</p>
    <p><strong>Net Pay:</strong> ₱${formatMoney(netPay)}</p>
  `;
  document.getElementById("summary-page").style.display = "block";
});

document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});

document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("summary-page").style.display = "none";
  document.getElementById("form-page").style.display = "block";
});

document.getElementById("sendBtn").addEventListener("click", () => {
  const overlay = document.createElement("div");
  overlay.className = "sending-overlay";
  overlay.innerHTML = `
    <div class="loader"></div>
    <h3>Sending payroll data...</h3>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.innerHTML = `
      <h3 style="color:green;">✅ Payroll was successfully sent to the company!</h3>
      <h3 style="color:green;">🎉 Congrats, may sahod ka na :P</h3>
    `;
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 2500);
  }, 3000);
});
