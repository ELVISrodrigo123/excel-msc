from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import LoginView
from .views import ProtectedView
from rest_framework.routers import DefaultRouter
from .authentication import views
from .views import ( ExcelFileViewSet, ShiftManagerViewSet, AreaForemanViewSet, EmployeeViewSet, ArtactividadViewSet, ActividadViewSet, AreaViewSet)
from .views import MineraDashboardView 

router = DefaultRouter()
router.register('excelfiles', ExcelFileViewSet)
router.register('shiftmanagers', ShiftManagerViewSet)
router.register('areaformans', AreaForemanViewSet)
router.register('employees', EmployeeViewSet)
router.register('artactividades', ArtactividadViewSet)
router.register('actividades', ActividadViewSet)
router.register('areas', AreaViewSet)

urlpatterns = router.urls

router.register('excelfiles', ExcelFileViewSet, basename='excelfiles')
router.register('shiftmanagers', ShiftManagerViewSet, basename='shiftmanagers')
router.register('areaformans', AreaForemanViewSet, basename='areaformans')
router.register('employees', EmployeeViewSet, basename='employees')
router.register('artactividades', ArtactividadViewSet, basename='artactividades')
router.register('actividades', ActividadViewSet, basename='actividades')
router.register('areas', AreaViewSet, basename='areas')

urlpatterns = [
    path('api/', include(router.urls)),
    path('excel-files/', views.ExcelFileListCreateView.as_view(), name='excel-file-list-create'),
    path('excel-files/<int:pk>/', views.ExcelFileDetailView.as_view(), name='excel-file-detail'),
    path('protected/', ProtectedView.as_view(), name='protected_view'),
    path('login/', LoginView.as_view(), name='login'),
    path('minera-dashboard/', MineraDashboardView.as_view(), name='minera_dashboard'),
]