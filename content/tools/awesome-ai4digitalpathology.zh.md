---
title: "Awesome-AI4DigitalPathology —— 精选参考文献清单"
description: "数字 / 计算病理 AI 的社区精选索引,涵盖 16 个子主题、约 447 条目（论文、数据集、工具）。"
tags: [tool, reference, awesome-list, pathology, index]
---

# Awesome-AI4DigitalPathology

{{ tool("awesome-ai4digitalpathology") }}

{{ local_graph("awesome-ai4digitalpathology") }}

## 是什么

由 <https://github.com/lingxitong/Awesome-AI4DigitalPathology> 维护的精选 awesome-list,持续更新。每个条目是一行 markdown bullet,指向一篇论文 / 模型 / 数据集 / 工具,附带会议/期刊、代码链接,可用时还附模型权重链接。

Pathology-Wiki 把这个 list 作为**发现来源 / 入库队列**：我们不是把每个条目都一口气全部 stub 进库,而是按优先级、按结构化补图谱缺口的逻辑增量挖矿。

## 覆盖范围

16 个子主题,约 447 条入库范围内条目：

| 章节 | 约 数 | 映射到 Pathology-Wiki |
|------|---:|---------------|
| 综述 / 评论 / 展望 | 16 | `review_article` |
| 数字切片扫描仪与文件格式 | 4 | `tool` |
| 数据集与基准 | 54 | `dataset` |
| 多实例学习 (MIL) | 45 | `method` / `technical_article` |
| 计算病理中的联邦学习 | 15 | `technical_article` |
| 块级基础模型 (Patch-Level FMs) | 34 | `model` / `technical_article` |
| 切片级基础模型与切片编码器 | 19 | `model` / `technical_article` |
| 细胞学与宫颈细胞学 | 35 | `clinical_article` |
| 多组学计算病理 | 41 | `technical_article`（E 分支） |
| 病理生成模型 | 31 | `technical_article` |
| 病理视觉-语言模型与 Agent | 76 | `model` / `technical_article`（D 分支） |
| 密集预测（分割） | 19 | `technical_article` |
| 临床任务与应用 | 25 | `clinical_article` |
| 图像配准与空间对齐 | 16 | `technical_article` |
| 资源、工具箱、开源项目 | 17 | `tool` |
| 未来趋势与热点 | 不计 | （超出范围） |

## Pathology-Wiki 如何使用

不是逐条复制 —— 那会产生数千个空白 stub 节点、毫无价值。而是：

1. 周期性快照 README（上次快照：2026-05-19）。
2. 解析并按 8 大方法分支（CLAUDE.md §7）分类。
3. 与现有 wiki 节点交叉匹配 —— 已收录的标 "in wiki"。
4. 按优先级评分（基础 PFM / VLM > MIL 变体 > 小众细胞学 / 配准）。
5. 对最高优先级项执行 `/add-article`（或批量入库流水线）。

当前分类、按优先级标注的队列在配套报告 [`reports/2026-05-19-awesome-list-queue.md`](https://github.com/Bokai-Zhao/Pathology-Wiki/blob/main/reports/2026-05-19-awesome-list-queue.md);压缩版同时嵌入到本节点的 [`SKILL.md`]({{ skill_card("awesome-ai4digitalpathology") }}) 里。

## 首次快照已在库的条目

首次快照交叉匹配命中 **18 条**：

- 数据集：{{ node_link("camelyon16") }}、{{ node_link("panda") }}、{{ node_link("bach") }}、{{ node_link("glas") }}、{{ node_link("pannuke") }}、{{ node_link("midog") }}。
- MIL：{{ node_link("abmil") }}（{{ node_link("abmil-2018") }}）、{{ node_link("clam") }}（{{ node_link("clam-2021") }}）、{{ node_link("transmil") }}（{{ node_link("transmil-2021") }}）。
- 细胞 / 组织：{{ node_link("hover-net") }}（{{ node_link("hover-net-2019") }}）、{{ node_link("cellvit") }}（{{ node_link("cellvit-2024") }}）。
- PFM / SSL：{{ node_link("uni") }}（{{ node_link("uni-2024") }}）、{{ node_link("ctranspath") }}（{{ node_link("ctranspath-2022") }}）。
- VLM：{{ node_link("plip") }}（{{ node_link("plip-2023") }}）、{{ node_link("mi-zero-2023") }}。
- 工具：{{ node_link("openslide") }}。
- 综述：{{ node_link("bahadir-2024") }}。

## 局限

- 每条目细节较浅 —— 数据集 / 指标 / 方法的精确抽取仍需读原文。
- 部分条目（Future Trends、泛 agentic 病理空想）不构成可入库的 Pathology-Wiki 节点。
- 快照漂移 —— 上游 README 独立更新。如果活跃在做入库,每 1–2 个月重新快照一次。

## Claude 应该如何使用这个资源

{{ skill_card("awesome-ai4digitalpathology") }}

当用户问 "病理领域最近的 X 是什么？" 或 "再找些关于 Y 的论文" 时,**浏览索引中对应章节** 而不是凭印象猜。入库时 **始终走每篇 `/add-article`** 流水线,确保 YAML / SKILL / 报告层一致 —— 不要从这个 list 一次性批量 stub。

## 参考

- 仓库：[lingxitong/Awesome-AI4DigitalPathology](https://github.com/lingxitong/Awesome-AI4DigitalPathology)
- README：[`README.md`](https://github.com/lingxitong/Awesome-AI4DigitalPathology/blob/main/README.md)
- 队列报告：[`reports/2026-05-19-awesome-list-queue.md`](https://github.com/Bokai-Zhao/Pathology-Wiki/blob/main/reports/2026-05-19-awesome-list-queue.md)
