fetch('/chart_store_age_vs_revenue')
    .then(response => response.json())
    .then(data => {
        const chartData = data.map(item => ({
            age: item.StoreAge,
            revenue: item.AvgRevenue
        }));

        am5.ready(function () {
            const root = am5.Root.new("chartdiv4");
            root.setThemes([am5themes_Animated.new(root)]);

            const chart = root.container.children.push(am5xy.XYChart.new(root, {
                layout: root.verticalLayout
            }));

            const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, { labelText: "Age: {valueX}" })
            }));

            const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            }));

            const series = chart.series.push(am5xy.LineSeries.new(root, {
                name: "Average Revenue",
                xAxis: xAxis,
                yAxis: yAxis,
                valueXField: "age",
                valueYField: "revenue",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "Age: {valueX}\nRevenue: {valueY}"
                })
            }));

            series.strokes.template.setAll({
                strokeWidth: 2
            });

            series.data.setAll(chartData);

            chart.appear(1000, 100);
        });
    });



