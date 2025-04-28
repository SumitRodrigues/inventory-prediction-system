<template>
    <div>
        <div ref="graph" class="graph-container"></div>
    </div>
</template>

<script setup>
import * as d3 from "d3";

const props = defineProps({
    stores: {
        type: Object,
        default: {}
    },
    transfers: {
        type: Object,
        default: {}
    }
});

const { stores, transfers } = toRefs(props);
// console.log(stores,transfers);

// Data for transfers and stores
// const transfers = [
//     { from: "Store2", to: "Store1", count: 3 },
//     { from: "Store3", to: "Store1", count: 5 },
//     { from: "Store1", to: "Store4", count: 2 },
// ];

// const stores = {
//     Store1: { name: "Store1", stockStatus: "Understock"},
//     Store2: { name: "Store2", stockStatus: "Understock"},
//     Store3: { name: "Store3", stockStatus: "Understock"},
//     Store4: { name: "Store4", stockStatus: "Understock"},
// };

// Ref for the graph container
const graph = ref(null);

const width = 800;
const height = 600;
const spacing = 250;

const svg = d3
    .select(graph.value)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Function to draw the graph
const drawGraph = () => {
    // graph.value = null;
    // d3.select(graph.value).remove();
    // svg.selectAll("*").remove();

    const centerX = width / 2;
    const centerY = height / 2;

    // Prepare nodes and positions
    const nodes = {};
    const links = transfers.value.map((transfer, index) => {
        const angle = (index * 2 * Math.PI) / transfers.value.length;
        const isOutgoing = transfer.from === "Store1";

        // Position nodes dynamically based on transfer direction
        nodes[transfer.from] = {
            ...stores.value[transfer.from],
            x: isOutgoing
                ? centerX
                : centerX + spacing * Math.cos(angle),
            y: isOutgoing
                ? centerY
                : centerY + spacing * Math.sin(angle),
        };
        nodes[transfer.to] = {
            ...stores.value[transfer.to],
            x: isOutgoing
                ? centerX + spacing * Math.cos(angle)
                : centerX,
            y: isOutgoing
                ? centerY + spacing * Math.sin(angle)
                : centerY,
        };

        return { source: transfer.from, target: transfer.to, count: transfer.count };
    });

    // Draw links (arrows)
    svg
        .selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("x1", (d) => nodes[d.source].x)
        .attr("y1", (d) => nodes[d.source].y)
        .attr("x2", (d) => nodes[d.target].x)
        .attr("y2", (d) => nodes[d.target].y)
        .attr("stroke", "#555")
        .attr("stroke-width", 4)
        .attr("marker-end", "url(#arrow)");

    // Add arrow marker
    svg
        .append("defs")
        .append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -15 20 20")
        .attr("refX", 30)
        .attr("refY", 0)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#555");

    // Add truck icons between arrows
    svg
        .selectAll(".truck")
        .data(links)
        .enter()
        .append("image")
        .attr("xlink:href", "/truck.svg")
        .attr("x", (d) => (nodes[d.source].x + nodes[d.target].x) / 2 - 30)
        .attr("y", (d) => (nodes[d.source].y + nodes[d.target].y) / 2 - 30)
        .attr("width", 60)
        .attr("height", 60);

    // Add quantities
    svg
        .selectAll(".count")
        .data(links)
        .enter()
        .append("text")
        .attr("x", (d) => (nodes[d.source].x + nodes[d.target].x) / 2)
        .attr("y", (d) => (nodes[d.source].y + nodes[d.target].y) / 2 - 30)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-weight", "500")
        .attr("fill", "#fff")
        .text((d) => d.count);

    // Draw nodes with icons
    svg
        .selectAll(".node")
        .data(Object.values(nodes))
        .enter()
        .append("image")
        .attr("xlink:href", (d) => "/store.png")
        .attr("x", (d) => d.x - 25)
        .attr("y", (d) => d.y - 25)
        .attr("width", 40)
        .attr("height", 40)
        .attr("class", "store-icon");

    // Add tooltips for store addresses
    const tooltip = d3
        .select(graph.value)
        .append("div")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("padding", "8px")
        .style("border-radius", "4px")
        .style("display", "none");

    svg
        .selectAll(".store-icon")
        .on("mouseover", function (event, d) {
            tooltip
                .style("display", "block")
                .html(`<strong>${d.name}</strong><br>${d.stockStatus}`)
                .style("left", `${event.pageX}px`)
                .style("top", `${event.pageY}px`);
        })
        .on("mouseout", () => {
            tooltip.style("display", "none");
        });

    // Add store names
    svg
        .selectAll(".label")
        .data(Object.values(nodes))
        .enter()
        .append("text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y - 28)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-weight", "500")
        .attr("fill", "#e20a03")
        .text((d) => d.name);
};

// Call `drawGraph` after the component is mounted
onMounted(() => {
    drawGraph();
});

watch(
    () => stores.value,
    (v) => {
        console.log('props.stores, props.transfers');
        console.log(stores.value);
        console.log(transfers.value);
        console.log('props.stores, props.transfers');

        drawGraph();
    })
watch(
    () => transfers.value,
    (v) => {
        console.log('props.stores, props.transfers');
        console.log(stores.value);
        console.log(transfers.value);
        console.log('props.stores, props.transfers');

        drawGraph();
    })
</script>

<style>
.graph-container {
    width: 800px;
    height: 600px;
    position: relative;
    margin: 20px auto;
}
</style>