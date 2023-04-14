#!/bin/sh

echo "The following is a code-base for Golem:"
echo
echo
find tests/ src/ golems/ -name '*.*' -print0 | xargs -0 -I{} sh -c 'echo {}; echo "==================================" ; echo; echo ; cat {} ; echo'
echo
echo
echo "Understand Golem's code base. And just tell me you acknowledge -- nothing else."
