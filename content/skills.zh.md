---
title: 技能
description: 以文档形式存在的 SKILL.md，描述 Claude 应如何使用每个对象。
---

# 技能

每个 `SKILL.md` 描述 Claude 应如何使用一个具体的对象（论文、工具、数据集、方法、模型、基准）或动作（论文 ingestion、图谱构建、博客撰写）。目前以文档形式存在 —— 高频使用的技能会被升级为 `.claude/skills/` 下注册过的 Claude Code 真 skill。

## 对象技能

- {{ skill_card("uni-2024") }}
- {{ skill_card("uni") }}
- {{ skill_card("openslide") }}
- {{ skill_card("panda") }}
- {{ skill_card("pathology-foundation-model") }}

## 流水线技能

- {{ skill_card("article_ingestion") }}
- {{ skill_card("clinical_article_ingestion") }}
- {{ skill_card("technical_article_ingestion") }}
- {{ skill_card("tool_ingestion") }}
- {{ skill_card("dataset_ingestion") }}
- {{ skill_card("method_mapping") }}
- {{ skill_card("benchmark_builder") }}
- {{ skill_card("graph_builder") }}
- {{ skill_card("taxonomy_updater") }}
- {{ skill_card("alphaxiv_blog_writer") }}
- {{ skill_card("skill_generator") }}
