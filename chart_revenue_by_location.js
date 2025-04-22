fetch('/chart_revenue_by_location')
    .then(response => response.json())
    .then(data => {
        const chartData = data.map(item => ({
            location: item.StoreLocation,
            revenue: item.TotalRevenue
        }));

        am5.ready(function () {
            const root = am5.Root.new("chartdiv2");
            root.setThemes([am5themes_Animated.new(root)]);

            const chart = root.container.children.push(am5xy.XYChart.new(root, {
                layout: root.verticalLayout
            }));

            const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: "location",
                renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
                tooltip: am5.Tooltip.new(root, { labelText: "{category}" })
            }));

            const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            }));

            const series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "Total Revenue",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "revenue",
                categoryXField: "location",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "Location: {categoryX}\nRevenue: {valueY}"
                })
            }));

            series.columns.template.states.create("hover", {
                fill: am5.color("#07527e")
            });

            xAxis.data.setAll(chartData);
            series.data.setAll(chartData);

            chart.appear(1000, 100);
        });
    });

