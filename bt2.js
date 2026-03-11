function getCurrentDateTime(){

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    document.getElementById("submitTime").innerText = date + " " + time;
}


function calculateAverage(){

    let total = 0;
    let count = 11;

    for(let i=1;i<=count;i++){

        let radios = document.getElementsByName("c"+i);
        let selectedValue = null;

        for(let j=0;j<radios.length;j++){

            if(radios[j].checked){
                selectedValue = radios[j].value;
            }

        }

        if(selectedValue == null){
            document.getElementById("result").innerText = "Chưa hoàn thành đánh giá";
            return null;
        }

        total = total + Number(selectedValue);
    }

    let average = (total/count).toFixed(2);

    document.getElementById("result").innerText = average;

    return average;
}



function submitSurvey(){

    let avg = calculateAverage();

    if(avg == null){
        alert("Chưa hoàn thành đánh giá");
        return;
    }

    let course = document.getElementById("nameInput").value;
    let teacher = document.getElementById("gvInput").value;
    let student = document.getElementById("studentInput").value;
    let time = document.getElementById("submitTime").innerText;

    let criteria = {};

    for(let i=1;i<=11;i++){

        let radios = document.getElementsByName("c"+i);

        for(let j=0;j<radios.length;j++){

            if(radios[j].checked){
                criteria["Tiêu chí "+i] = radios[j].value;
            }

        }
    }

    let data = {
        courseName: course,
        teacherName: teacher,
        studentName: student,
        submitTime: time,
        criteria: criteria,
        averageScore: avg
    };

    let jsonText = JSON.stringify(data,null,4);

    document.getElementById("jsonResult").innerText = jsonText;
}



window.onload = function(){

    getCurrentDateTime();

    document.getElementById("addButton").onclick = submitSurvey;

    // thêm phần này để radio tự tính điểm
    let radios = document.querySelectorAll("input[type=radio]");

    for(let i=0;i<radios.length;i++){
        radios[i].onclick = calculateAverage;
    }

}