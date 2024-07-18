export const modelOptions = [
    { label: 'OpenELM 270M', value: 'apple/OpenELM-270M' },
    { label: 'OpenELM 450M', value: 'apple/OpenELM-450M' },
    { label: 'OpenELM 3B', value: 'apple/OpenELM-3B' },
    { label: 'GPT2', value: 'openai-community/gpt2' },
    { label: 'GPT-2 Medium', value: 'openai-community/gpt2-medium' },
    { label: 'GPT-2 Large', value: 'openai-community/gpt2-large' },
    { label: 'GPT-2 XL', value: 'openai-community/gpt2-xl' },
    { label: 'LLaMA-2 7B', value: 'openlm-research/open_llama_7b_v2' },
    { label: 'LLaMA-2 13B', value: 'openlm-research/open_llama_13b' },
    { label: 'NousResearch llama2', value: 'NousResearch/Llama-2-7b-chat-hf' },
  ];
  
  export const datasetOptions = {
    'openai-community/gpt2': [
      { label: 'wikitext-103-raw-v1', value: 'iohadrubin/wikitext-103-raw-v1' },
      { label: 'wikitext-2-raw-v1', value: 'carlosejimenez/wikitext__wikitext-2-raw-v1' },
    ],
    'openai-community/gpt2-medium': [
      { label: 'wikitext-103-raw-v1', value: 'iohadrubin/wikitext-103-raw-v1' },
      { label: 'wikitext-2-raw-v1', value: 'carlosejimenez/wikitext__wikitext-2-raw-v1' },
    ],
    'openai-community/gpt2-large': [
      { label: 'wikitext-103-raw-v1', value: 'iohadrubin/wikitext-103-raw-v1' },
      { label: 'wikitext-2-raw-v1', value: 'carlosejimenez/wikitext__wikitext-2-raw-v1' },
    ],
    'openai-community/gpt2-xl': [
      { label: 'wikitext-103-raw-v1', value: 'iohadrubin/wikitext-103-raw-v1' },
      { label: 'wikitext-2-raw-v1', value: 'carlosejimenez/wikitext__wikitext-2-raw-v1' },
    ],
    'openlm-research/open_llama_7b_v2': [
      { label: 'guanaco-llama2-1k', value: 'mlabonne/guanaco-llama2-1k' },
    ],
    'openlm-research/open_llama_13b': [
      { label: 'guanaco-llama2-1k', value: 'mlabonne/guanaco-llama2-1k' },
    ],
    'NousResearch/Llama-2-7b-chat-hf': [
      { label: 'guanaco-llama2-1k', value: 'mlabonne/guanaco-llama2-1k' },
    ],
    'apple/OpenELM-270M': [
      { label: 'oasst2_top4k_en', value: 'g-ronimo/oasst2_top4k_en' },
    ],
    'apple/OpenELM-450M': [
      { label: 'oasst2_top4k_en', value: 'g-ronimo/oasst2_top4k_en' },
    ],
    'apple/OpenELM-3B': [
      { label: 'oasst2_top4k_en', value: 'g-ronimo/oasst2_top4k_en' },
    ],
  };
  