creation_rules:
  - path_regex: \.enc\.json$
    age: >-
      %{ for key in age_keys ~}
      ${key},%{ endfor }
  - path_regex: envs/.*\.enc\.env$
    age: >-
      %{ for key in age_keys ~}
      ${key},%{ endfor }
