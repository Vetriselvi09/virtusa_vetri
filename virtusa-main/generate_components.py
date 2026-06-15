import os

base_path = 'src/app/features'

modules = {
    'store-manager': ['alerts', 'reports', 'analytics', 'settings'],
    'warehouse': ['scanner', 'stock-entry', 'updates', 'dispatch', 'returns', 'reconciliation', 'notifications'],
    'finance': ['dashboard', 'approvals', 'reports', 'payments', 'analytics', 'valuation', 'audit', 'settings'],
    'supplier': ['dashboard', 'orders', 'schedules', 'eta', 'history', 'invoices', 'notifications', 'profile'],
    'super-admin': ['dashboard', 'users', 'roles', 'stores', 'suppliers', 'analytics', 'audit', 'settings']
}

template = """import {{ Component }} from '@angular/core';
import {{ PagePlaceholderComponent }} from '{relative_path}';

@Component({{
  selector: 'app-{selector}',
  standalone: true,
  imports: [PagePlaceholderComponent],
  template: '<app-page-placeholder title="{title}"></app-page-placeholder>'
}})
export class {class_name}Component {{}}
"""

for role, pages in modules.items():
    for page in pages:
        dir_path = os.path.join(base_path, role, page)
        os.makedirs(dir_path, exist_ok=True)
        
        file_path = os.path.join(dir_path, f'{page}.component.ts')
        
        # Relative path to shared placeholder
        # e.g. from src/app/features/store-manager/alerts/alerts.component.ts 
        # to src/app/shared/components/page-placeholder/page-placeholder.component
        # depth is 3: features/role/page
        relative_path = '../../../shared/components/page-placeholder/page-placeholder.component'
        if page == 'dashboard':
            # Some roles might have specific dashboards already, skip them if file exists
            if os.path.exists(file_path):
                continue

        selector = f"{role[:2]}-{page}"
        class_name = page.replace('-', ' ').title().replace(' ', '')
        title = page.replace('-', ' ').title()
        
        content = template.format(
            relative_path=relative_path,
            selector=selector,
            title=title,
            class_name=class_name
        )
        
        with open(file_path, 'w') as f:
            f.write(content)

print("Generated all missing components.")
