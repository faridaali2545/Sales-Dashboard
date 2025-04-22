fetch('/chart_revenue_by_category')
    .then(response => response.json())
    .then(data => {
        const chartData = data.map(item => ({
            category: item.StoreCategory,
            revenue: item.AvgRevenue
        }));

        am5.ready(function () {
            const root = am5.Root.new("chartdiv1");
            root.setThemes([am5themes_Animated.new(root)]);

            const chart = root.container.children.push(am5xy.XYChart.new(root, {
                layout: root.verticalLayout
            }));

            const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: "category",
                renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
                tooltip: am5.Tooltip.new(root, { labelText: "{category}" })
            }));

            const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            }));

            const series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "Average Revenue",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "revenue",
                categoryXField: "category",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "Category: {categoryX}\nRevenue: {valueY}"
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