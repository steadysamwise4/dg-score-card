export function organizeHoleData(data) {
    const holeData = [];
    if (data[1].tee_1_par !== "0") {
        for (let i=1;i<data.length;i++) {
            let obj = {holeNumber: Number(data[i].hole_num), par: Number(data[i].tee_1_par), length: data[i].tee_1_len};
            holeData.push(obj);  
        }
        
    } else if (data[1].tee_2_par !== "0") {
        for (let i=1;i<data.length;i++) {
            let obj = {holeNumber: Number(data[i].hole_num), par: Number(data[i].tee_2_par), length: data[i].tee_2_len};
            holeData.push(obj);  
        }
        
    } else {
        for (let i=1;i<data.length;i++) {
            let obj = {holeNumber: Number(data[i].hole_num), par: 3, length: "-"};
            holeData.push(obj);  
        }  
    }

    function compare(obj1, obj2) {
        return obj1.holeNumber - obj2.holeNumber;
    }
    return holeData.sort(compare);
}