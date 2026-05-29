#!/bin/bash

# Укажите пути к папкам
pathA="web_root/"
pathB="certs/"

# Проверка существования хотя бы одной папки
if [ ! -d "$pathA" ] && [ ! -d "$pathB" ]; then
  echo "Ни одна из указанных папок не существует."
  exit 1
fi

# Проверка наличия ключей
if [ "$1" == "-z" ]; then
  content=""

# Создание или добавление содержимого в переменную
  for p in "$pathA" "$pathB"; do
    if [ -d "$p" ]; then
      echo "test"
      while IFS= read -r -d '' file; do
        gzip -c "$file" > "$file.gz"
        #content+=$(realpath "$file.gz" --relative-to="$PWD")$'\n'
        #content+=$(python3 -c "import os; print(os.path.relpath('$file.gz', '$PWD'))")$'\n'
        content+=$(echo "$file.gz" | sed "s|$PWD/||" | sed 's|//|/|')$'\n'
      done < <(find "$p" -mindepth 1 -type f -print0)
      ./pack $content > ./Core/Src/packed_fs.c
    fi
  done

  # Удаление всех архивов в папках
  rm -f "$pathA"*.gz "$pathB"*.gz

  # Вывод содержимого переменной в терминал
  echo "$content"
else
  content=""
  echo "test1"

  # Создание или добавление содержимого в переменную без архивации
  for p in "$pathA" "$pathB"; do
    if [ -d "$p" ]; then      
      echo "test2"
      while IFS= read -r -d '' file; do
        #content+=$(realpath "$file.gz" --relative-to="$PWD")$'\n'
        #content+=$(python3 -c "import os; print(os.path.relpath('$file', '$PWD'))")$'\n'
        content+=$(echo "$file" | sed "s|$PWD/||" | sed 's|//|/|')$'\n'
      done < <(find "$p" -mindepth 1 -type f -print0)
      ./pack $content > ./Core/Src/packed_fs.c
    fi
  done

  # Вывод содержимого переменной в терминал
  echo "$content"
fi