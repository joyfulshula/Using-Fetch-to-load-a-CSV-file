chatMake();


async function chatMake() {
	const data = await getData();
const ctx = document.getElementById('chart').getContext('2d');


// this is my code for the chart designs
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data.xs,
        datasets: [{
            label: 'Combined Land Surface Air and Sea-Surface water Temperature in C°',
            data: data.ys,
            fill: false,
            backgroundColor:'#ffb300',
            borderColor: '#ffb300',
            borderWidth: 1,
        }]
    },
        options: {
        scales: {
            yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return value + '°';
                    }
                }
            }]
        }
    }
});
}


async function getData() {
	const xs= [];
	const ys = [];
	const response = await fetch('ZonAnn.Ts+dSST.csv');
	const data = await response.text();

	const table = data.split('\n').slice(1);
	table.forEach(row => {
		const columns = row.split(',');
		const year =columns[0];
		xs.push(year);
		const temp =columns[1];
		ys.push(parseFloat(temp) + 14);
		console.log(year, temp);
	});
	return {xs, ys};
}