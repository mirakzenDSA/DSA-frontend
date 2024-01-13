function show_stored_page_data(game, doubled, data1, amount1, data2, amount2) {
    var category1_id = "counter1";
    var category1_count = 0;

    for (var i = 1; i <= amount1; i++) {
        var id = game + "_" + data1 + "-" + i;
        var d_id = game + "_" + data1 + "-";
        if (doubled) {
            d_id += (1000+i);
        }

        var data = localStorage.getItem(id);

        if (data == 1) {
            category1_count++;
            document.getElementById(id).className = "completed";
            if (doubled) {
                document.getElementById(d_id).className = "completed";
            }
        }
    }
    document.getElementById(category1_id).textContent = category1_count;

    if (data2 != "") {
        var category2_id = "counter2";
        var category2_count = 0;

        for (var i = 1; i <= amount2; i++) {
            var id = game + "_" + data2 + "-" + i;
            var d_id = game + "_" + data2 + "-";
            if (doubled) {
                d_id += (1000+i);
            }

            var data = localStorage.getItem(id);
            if (data == 1) {
                category2_count++;
                document.getElementById(id).className = "completed";
                if (doubled) {
                    document.getElementById(d_id).className = "completed";
                }
            }
        }
        document.getElementById(category2_id).textContent = category2_count;
    }
};


function mark_row(element, doubled_param) {
    element_id = element.parentNode.parentNode.id;
    d_element_id = element.parentNode.parentNode.id;

    el = element_id.split('-');
    element_str = el[0];
    element_num = parseInt(el[1]);

    if (doubled_param == 1) {
        d_element_id = element_str + "-" + (element_num + 1000);
    } else if (doubled_param == 2) {
        d_element_id = element_str + "-" + (element_num - 1000);
    }

    table_id = element.parentNode.parentNode.parentNode.parentNode.id;
    count_id = "counter" + table_id.slice(-1);
    var count = parseInt(document.getElementById(count_id).innerHTML);

    if ( document.getElementById(element_id).classList.contains('uncompleted') ) {
        document.getElementById(element_id).className = "completed";

        if (doubled_param) {
            document.getElementById(d_element_id).className = "completed";
            if (doubled_param == 1) {
                localStorage.setItem(element_id, 1);
            } else if (doubled_param == 2) {
                localStorage.setItem(d_element_id, 1);
            }
        } else {
            localStorage.setItem(element_id, 1);
        }

        count++;
    } else {
        document.getElementById(element_id).className = "uncompleted";

        if (doubled_param) {
            document.getElementById(d_element_id).className = "uncompleted";
            if (doubled_param == 1) {
                localStorage.removeItem(element_id);
            } else if (doubled_param == 2) {
                localStorage.removeItem(d_element_id);
            }
        } else {
            localStorage.removeItem(element_id);
        }

        count--;
    }
    document.getElementById(count_id).textContent = count;
};


function mark_row_cov(element, mode) {
    element_id = element.parentNode.parentNode.id;
    count1_id = "counter1";
    count2_id = "counter2";
    var count1 = parseInt(document.getElementById("counter1").innerHTML);
    var count2 = parseInt(document.getElementById("counter2").innerHTML);

    el = element_id.split('-');
    element_str = el[0];
    element_num = parseInt(el[1]);

    cov_id = "ds3_cov-" + element_num;
    item_el_2_id = "ds3_covenant_item2-" + element_num;

    if ( document.getElementById(element_id).classList.contains('uncompleted') ) {
        document.getElementById(element_id).className = "completed";
        localStorage.setItem(element_id, 1);
        if (mode == "count") {
            document.getElementById(cov_id).className = "text-center info-content td-25 completed";
            count2++;
            if (element_num == 4) {
                localStorage.setItem(element_str + "-2", 1);
                localStorage.setItem(element_str + "-3", 1);
                document.getElementById(element_str + "-2").className = "completed";
                document.getElementById(element_str + "-3").className = "completed";

                document.getElementById("ds3_cov-2").className = "text-center info-content td-25 completed";
                document.getElementById("ds3_cov-3").className = "text-center info-content td-25 completed";
            }
        } else if (mode == "items") {
            document.getElementById(item_el_2_id).className = "completed";
            localStorage.setItem(item_el_2_id, 1);
        } else if (mode == "emb") {
            count1++;
        }
    } else {
        document.getElementById(element_id).className = "uncompleted";
        localStorage.removeItem(element_id);
        if (mode == "count") {
            document.getElementById(cov_id).className = "text-center info-content td-25 uncompleted";
            count2--;

            if (element_num == 4) {
                localStorage.removeItem(element_str + "-2");
                localStorage.removeItem(element_str + "-3");
                document.getElementById(element_str + "-2").className = "uncompleted";
                document.getElementById(element_str + "-3").className = "uncompleted";

                document.getElementById("ds3_cov-2").className = "text-center info-content td-25 uncompleted";
                document.getElementById("ds3_cov-3").className = "text-center info-content td-25 uncompleted";
            }
        } else if (mode == "items") {
            document.getElementById(item_el_2_id).className = "uncompleted";
            localStorage.removeItem(item_el_2_id);
        } else if (mode == "emb") {
            count1--;
        }
    }
    document.getElementById(count1_id).textContent = count1;
    document.getElementById(count2_id).textContent = count2;
};

function show_stored_page_data_cov(game, data, amount) {
    var counter1_id = "counter1";
    var count1 = 0;
    var counter2_id = "counter2";
    var count2 = 0;

    for (var i = 1; i <= amount; i++) {
        var cov_id = game + "_" + data + "-" + i;
        var cov2_id = game + "_cov-" + i;
        var emb_id = game + "_" + data + "_emblem-" + i;
        var item_id = game + "_" + data + "_item-" + i;
        var item2_id = game + "_" + data + "_item2-" + i;

        var cov = localStorage.getItem(cov_id);
        var emb = localStorage.getItem(emb_id);
        var item = localStorage.getItem(item_id);
        var item2 = localStorage.getItem(item2_id);

        if (cov == 1) {
            if (i != 2 && i != 3) {
                count2++;
            }
            
            document.getElementById(cov_id).className = "completed";
            document.getElementById(cov2_id).className = "text-center info-content td-25 completed";
        }
        if (emb == 1) {
            document.getElementById(emb_id).className = "completed";
            count1++;
        }
        if (item == 1) {
            document.getElementById(item_id).className = "completed";
        }
        if (item2 == 1) {
            document.getElementById(item2_id).className = "completed";
        }
    }
    document.getElementById(counter1_id).textContent = count1;
    document.getElementById(counter2_id).textContent = count2;
};


function mark_row_quest(element) {
    element_id = element.parentNode.parentNode.id;

    table_id = element.parentNode.parentNode.parentNode.parentNode.id;
    count_id = "counter" + table_id.slice(-1);
    var count = parseInt(document.getElementById(count_id).innerHTML);

    if ( document.getElementById(element_id).classList.contains('uncompleted') ) {
        document.getElementById(element_id).className = "completed";
        localStorage.setItem(element_id, 1);
        count++;
    } else {
        document.getElementById(element_id).className = "uncompleted";
        localStorage.removeItem(element_id);
        count--;
    }

    document.getElementById(count_id).textContent = count;    
};

function show_stored_page_data_quest(game) {
    var counter1_id = "counter1";
    var count1 = 0;
    var counter2_id = "counter2";
    var count2 = 0;
    var counter3_id = "counter3";
    var count3 = 0;
    var counter4_id = "counter4";
    var count4 = 0;

    for (var i = 1; i <= 11; i++) {
        var id = game + "_questline_1-" + i;
        var quest = localStorage.getItem(id);
        if (quest == 1) {
            document.getElementById(id).className = "completed";
            count1++;
        }
    }
    for (var i = 1; i <= 5; i++) {
        var id = game + "_questline_2-" + i;
        var quest = localStorage.getItem(id);
        if (quest == 1) {
            document.getElementById(id).className = "completed";
            count2++;
        }
    }
    for (var i = 1; i <= 4; i++) {
        var id = game + "_questline_3-" + i;
        var quest = localStorage.getItem(id);
        if (quest == 1) {
            document.getElementById(id).className = "completed";
            count3++;
        }
    }
    for (var i = 1; i <= 5; i++) {
        var id = game + "_questline_4-" + i;
        var quest = localStorage.getItem(id);
        if (quest == 1) {
            document.getElementById(id).className = "completed";
            count4++;
        }
    }
    document.getElementById(counter1_id).textContent = count1;
    document.getElementById(counter2_id).textContent = count2;
    document.getElementById(counter3_id).textContent = count3;
    document.getElementById(counter4_id).textContent = count4;
};


function mark_person(element) {
    element_id = element.parentNode.id;

    if ( document.getElementById(element_id).classList.contains('uncompleted') ) {
        document.getElementById(element_id).className = "completed text-center td-33 td-padding vert-align";
        localStorage.setItem(element_id, 1);
    } else {
        document.getElementById(element_id).className = "uncompleted text-center td-33 td-padding vert-align";
        localStorage.removeItem(element_id);
    } 
};

function show_stored_page_data_person(game, data, amount) {
    for (var i = 1; i <= amount; i++) {
        var id = game + "_" + data + "-" + i;
        var person = localStorage.getItem(id);
        if (person == 1) {
            document.getElementById(id).className = "completed text-center td-33 td-padding vert-align";
        }
    }
};

function mark_boss(element) {
    var counter1_id = "counter1";
    var count = parseInt(document.getElementById(counter1_id).innerHTML);
    element_id = element.parentNode.id;

    if ( document.getElementById(element_id).classList.contains('uncompleted') ) {
        document.getElementById(element_id).className = "completed text-center td-33 td-padding vert-align";
        localStorage.setItem(element_id, 1);
        count++;
    } else {
        document.getElementById(element_id).className = "uncompleted text-center td-33 td-padding vert-align";
        localStorage.removeItem(element_id);
        count--;
    }
    document.getElementById(counter1_id).textContent = count;
};

function show_stored_page_data_boss(game, data, amount) {
    var counter1_id = "counter1";
    var count1 = 0;

    for (var i = 1; i <= amount; i++) {
        var id = game + "_" + data + "-" + i;
        var boss = localStorage.getItem(id);
        if (boss == 1) {
            document.getElementById(id).className = "completed text-center td-33 td-padding vert-align";
            count1++;
        }
    }
    document.getElementById(counter1_id).textContent = count1;
};
