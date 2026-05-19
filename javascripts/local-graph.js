/*
 * Pathology-Wiki local-graph renderer.
 *
 * Looks for <div class="pwiki-localgraph-canvas" data-graph="{json}"
 *   data-center="{id}"> on the current page and replaces each with a
 * Cytoscape force-directed 1-hop graph.
 *
 * Per-type node colors mirror CSS custom properties (--pwiki-color-*).
 *
 * The macro `local_graph(id)` in macros.py emits the placeholder and inlines
 * the precomputed 1-hop subgraph (nodes + edges + center) as JSON. No
 * additional network request needed at runtime.
 */
(function () {
  if (typeof window === "undefined" || typeof cytoscape === "undefined") return;

  function cssVar(name, fallback) {
    if (typeof getComputedStyle !== "function") return fallback;
    const v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return (v && v.trim()) || fallback;
  }

  const TYPE_COLOR = {
    article:           cssVar("--pwiki-color-article", "#5E35B1"),
    clinical_article:  cssVar("--pwiki-color-article", "#5E35B1"),
    technical_article: cssVar("--pwiki-color-article", "#5E35B1"),
    review_article:    cssVar("--pwiki-color-article", "#5E35B1"),
    benchmark_article: cssVar("--pwiki-color-article", "#5E35B1"),
    dataset_article:   cssVar("--pwiki-color-article", "#5E35B1"),
    tool_article:      cssVar("--pwiki-color-article", "#5E35B1"),
    guideline_article: cssVar("--pwiki-color-article", "#5E35B1"),
    perspective_article: cssVar("--pwiki-color-article", "#5E35B1"),
    preprint:          cssVar("--pwiki-color-article", "#5E35B1"),
    method:            cssVar("--pwiki-color-method", "#7E57C2"),
    dataset:           cssVar("--pwiki-color-dataset", "#3F51B5"),
    model:             cssVar("--pwiki-color-model", "#B39DDB"),
    tool:              cssVar("--pwiki-color-tool", "#5C6BC0"),
    benchmark:         cssVar("--pwiki-color-benchmark", "#7986CB"),
    skill:             cssVar("--pwiki-color-skill", "#9575CD"),
  };

  function colorFor(type) {
    return TYPE_COLOR[type] || cssVar("--pwiki-color-default", "#9FA8DA");
  }

  function shorten(label, max) {
    if (!label) return "";
    return label.length > max ? label.slice(0, max - 1) + "…" : label;
  }

  function render(container) {
    let payload;
    try {
      payload = JSON.parse(container.getAttribute("data-graph") || "{}");
    } catch (e) {
      console.warn("[pwiki] bad graph JSON on", container, e);
      return;
    }
    const centerId = container.getAttribute("data-center") || "";
    const nodes = payload.nodes || [];
    const edges = payload.edges || [];
    if (nodes.length === 0) return;

    const elements = [];
    nodes.forEach(function (n) {
      const isCenter = n.id === centerId;
      elements.push({
        group: "nodes",
        data: {
          id: n.id,
          label: shorten(n.label || n.id, 28),
          type: n.type || "default",
          href: n.href || "",
          color: colorFor(n.type),
          center: isCenter,
        },
      });
    });
    edges.forEach(function (e, i) {
      elements.push({
        group: "edges",
        data: {
          id: "e" + i,
          source: e.from,
          target: e.to,
          label: e.type || "",
        },
      });
    });

    const cy = cytoscape({
      container: container,
      elements: elements,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "data(color)",
            "label": "data(label)",
            "color": "#1f1b3a",
            "font-size": "11px",
            "font-weight": "500",
            "text-valign": "bottom",
            "text-halign": "center",
            "text-margin-y": 6,
            "text-background-color": "#ffffff",
            "text-background-opacity": 0.85,
            "text-background-padding": "2px",
            "text-background-shape": "roundrectangle",
            "text-wrap": "wrap",
            "text-max-width": "120px",
            "width": 32,
            "height": 32,
            "border-width": 1,
            "border-color": "rgba(69, 39, 160, 0.25)",
            "transition-property": "background-color, border-color, width, height",
            "transition-duration": "200ms",
          },
        },
        {
          selector: "node[?center]",
          style: {
            "width": 54,
            "height": 54,
            "font-size": "13px",
            "font-weight": "700",
            "border-width": 3,
            "border-color": "#4527A0",
            "z-index": 10,
          },
        },
        {
          selector: "node:hover",
          style: {
            "border-width": 3,
            "border-color": "#3F51B5",
            "width": 42,
            "height": 42,
          },
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "line-color": "#b0a8d6",
            "width": 1.5,
            "target-arrow-color": "#b0a8d6",
            "target-arrow-shape": "triangle",
            "arrow-scale": 0.9,
            "label": "data(label)",
            "font-size": "9px",
            "color": "#6b5fa8",
            "text-background-color": "#ffffff",
            "text-background-opacity": 0.7,
            "text-background-padding": "2px",
            "text-rotation": "autorotate",
          },
        },
        {
          selector: "edge:hover",
          style: {
            "line-color": "#7E57C2",
            "target-arrow-color": "#7E57C2",
            "width": 2.5,
          },
        },
      ],
      layout: {
        name: "cose",
        animate: false,
        idealEdgeLength: 110,
        nodeRepulsion: 8000,
        edgeElasticity: 100,
        gravity: 0.25,
        numIter: 1200,
        fit: true,
        padding: 30,
        randomize: true,
      },
      wheelSensitivity: 0.2,
      minZoom: 0.25,
      maxZoom: 3,
    });

    // Click to navigate
    cy.on("tap", "node", function (evt) {
      const href = evt.target.data("href");
      if (href) window.location.href = href;
    });

    // Re-fit when container becomes visible (helps with details/tabs)
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(function () {
        cy.resize();
        cy.fit(undefined, 30);
      });
      ro.observe(container);
    }
  }

  function initAll() {
    const containers = document.querySelectorAll(".pwiki-localgraph-canvas[data-graph]");
    containers.forEach(render);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  // Re-run on Material's instant-navigation page changes
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () {
      initAll();
    });
  }
})();
