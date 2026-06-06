import re

file_paths = {
    'AdminPackages': 'c:/Users/DELL/Documents/azulsurf-morocco/frontend/src/pages/admin/AdminPackages.jsx',
    'AdminGallery': 'c:/Users/DELL/Documents/azulsurf-morocco/frontend/src/pages/admin/AdminGallery.jsx',
    'AdminReviews': 'c:/Users/DELL/Documents/azulsurf-morocco/frontend/src/pages/admin/AdminReviews.jsx',
    'AdminMessages': 'c:/Users/DELL/Documents/azulsurf-morocco/frontend/src/pages/admin/AdminMessages.jsx'
}

for name, file_path in file_paths.items():
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'useTranslation' not in content:
        content = content.replace(
            "import { motion, AnimatePresence } from 'framer-motion';",
            "import { motion, AnimatePresence } from 'framer-motion';\nimport { useTranslation } from 'react-i18next';"
        )
        content = content.replace(
            f"export default function {name}() {{",
            f"export default function {name}() {{\n  const {{ t }} = useTranslation();"
        )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
