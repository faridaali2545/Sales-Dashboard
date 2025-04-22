fetch('/chart_footfall_vs_size')
    .then(response => response.json())
    .then(data => {
        const chartData = data.map(item => ({
            size: item.StoreSize,
            footfall: item.AvgFootfall
        }));

        am5.ready(function () {
            const root = am5.Root.new("chartdiv3");
            root.setThemes([am5themes_Animated.new(root)]);

            const chart = root.container.children.push(am5xy.XYChart.new(root, {
                layout: root.verticalLayout,
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true
            }));

            // Create X-axis
            const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, { labelText: "Size: {valueX}" }),
                title: am5.Label.new(root, {
                    text: "Store Size",
                    fontSize: 14,
                    fontWeight: "bold"
                })
            }));

            // Create Y-axis
            const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
                tooltip: am5.Tooltip.new(root, { labelText: "Footfall: {valueY}" }),
                title: am5.Label.new(root, {
                    text: "Average Footfall",
                    fontSize: 14,
                    fontWeight: "bold"
                })
            }));

            // Create series for scatter plot
            const series = chart.series.push(am5xy.LineSeries.new(root, {
                name: "Footfall vs Size",
                xAxis: xAxis,
                yAxis: yAxis,
                valueXField: "size",
                valueYField: "footfall",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "Size: {valueX}\nFootfall: {valueY}"
                })
            }));

            // Set series settings for scatter plot
            series.strokes.template.setAll({
                strokeOpacity: 0 // Remove line stroke for scatter plot
            });

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        radius: 5,
                        fill: am5.color(0x5a9bd5),
                        tooltipText: "Size: {valueX}\nFootfall: {valueY}"
                    })
                });
            });

            // Add data
            series.data.setAll(chartData);

            // Add legend
            chart.children.push(am5.Legend.new(root, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                y: am5.percent(10)
            }));

            // Add exporting functionality
            const exporting = am5plugins.Exporting.new(root, {
                menu: am5plugins.ExportingMenu.new(root, {})
            });

            // Animate chart appearance
            chart.appear(1000, 100);
        });
    })
    .catch(error => console.error("Error loading chart data:", error));
