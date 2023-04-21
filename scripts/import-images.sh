#!/usr/bin/env bash
# Import images to include on pages
#
# Note: This assumes I'm running the script from the repo root

usage() {
  echo ""
  echo "Usage:"
  echo "  scripts/import-images.sh <path/to/image1> [, <path/to/image2>, ...]"
  echo ""
  echo "This does 3 main things:"
  echo "  - creates a thumbnail image of max-width 640px in the /img dir"
  echo "  - copies the original image to the /img dir"
  echo "  - copies the markdown for the input image(s) to the clipboard"
  echo ""
  echo "Input images will be numbered sequentially, using the input base filename"
}

if [ "$#" -gt 0 ]
then
  # prompt for base filename (and all the files will use that base name)
  echo -n "What base filename to use? "
  read -r base_filename
  if [ -z "$base_filename" ]
  then
    echo "no filename entered"
    exit 1
  fi
fi

image_num=1
out_md=()

# process the input images
for image in "$@"
do
  file_width_px="$(identify -format "%w" "$image")"
  echo "image: $image (width: ${file_width_px}px)"

  file_ext="${image##*.}"
  output_file_path="img/$base_filename-$image_num.$file_ext"
  output_thumb_path="img/$base_filename-$image_num-tn.$file_ext"

  while [ -f "$output_file_path" ]
  do
    (( image_num += 1 ))
    output_file_path="img/$base_filename-$image_num.$file_ext"
    output_thumb_path="img/$base_filename-$image_num-tn.$file_ext"
  done

  # process the file, using image magick if a thumbnail is needed
  if [ "$file_width_px" -gt 640 ]
  then
    # resize to width of 640px for the thumbnail
    convert "$image" -resize 640 "$output_thumb_path"
    echo "thumbnail: $output_thumb_path"

    # copy the orig file to /img
    cp "$image" "$output_file_path"
    echo "output: $output_file_path"

    out_md+=( "[![alt text](/$output_thumb_path)](/$output_file_path)" )
  else
    # copy the orig file to /img
    cp "$image" "$output_file_path"
    echo "output: $output_file_path"

    out_md+=( "[![alt text](/$output_file_path)](/$output_file_path)" )
  fi
done

# show the markdown to use the image(s), and also copy it to the clipboard
md=$(IFS=$'\n' ; echo "${out_md[*]}")
echo ""
echo "Markdown to use:"
echo "$md"

echo "$md" | pbcopy
echo ""
echo "(it has also been copied to the clipboard)"
