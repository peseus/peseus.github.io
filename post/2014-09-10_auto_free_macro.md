# 一行代码解决局部资源管理-宏在资源释放的应用
## 1.1	背景
C++中，如果函数抛出异常，或者存在多路分支返回的场景下，资源的释放是一个比较麻烦的事情。一方面要写较多的代码覆盖所有场景，另一方面可能存在疏漏的可能。利用构造析构函数来进行局部资源的释放是一个比较好的方案。但不足之处在于灵活性不够，即便是泛型化，也是灵活性不够的。借鉴宏的能力，可以推广这种灵活性。
## 1.2	设计方法
不同的资源的释放函数可能不同，差一点在于函数名称，函数的参数的个数以及函数的参数类型不同。只要讲这些内容作为宏的变量，参数化后，即可达到通用的目的。所幸的是一般资源释放函数的参数都不多，目前见到也基本只有一个参数，所以更多的是适应单参数的场景。
## 1.3 代码
```
#ifndef AUTO_FREE_X_HELPER_H_
#define AUTO_FREE_X_HELPER_H_

/******************************************
* @file auto_free_x_helper.h
* @author jinwentan@tencent.com
* @date 2014-08-26
* @description 一组宏，可以用来释放资源。局部对象的析构函数在异常抛出或者函数返回前都会被调用，
*	利用析构函数可以解决异常抛出，函数多路返回时的资源释放麻烦问题。
*/

#define	 CONCAT_AUTO_FREE_STRING(s1, s2) s1##s2
#define  MAKE_AUTO_FREE_TRIGGLE_CLASS(line)  CONCAT_AUTO_FREE_STRING(AutoFreeXYZ1,  line)
#define  MAKE_AUTO_FREE_TRIGGLE_OBJ(line, args...) MAKE_AUTO_FREE_TRIGGLE_CLASS(line) CONCAT_AUTO_FREE_STRING(auto_free_, line) (args)

// 带单个参数的资源释放函数
/**
 * hanle_ptr 资源释放函数名
 * Type1 参数类型1
 * var1 实际资源1
 */
#define SET_AUTO_FREE_TRIGGLE_X1(hanle_ptr, Type1, var1) \
	class MAKE_AUTO_FREE_TRIGGLE_CLASS(__LINE__) { \
		public: \
				MAKE_AUTO_FREE_TRIGGLE_CLASS(__LINE__) (Type1 arg1) { \
					this->arg1_ = arg1; \
				} \
		~MAKE_AUTO_FREE_TRIGGLE_CLASS(__LINE__) () { \
			hanle_ptr(this->arg1_); \
		} \
		private: \
			Type1 arg1_; \
	}; \
	MAKE_AUTO_FREE_TRIGGLE_OBJ(__LINE__, var1)

// 带单个参数的资源释放函数
/**
 * hanle_ptr 资源释放函数名
 * Type1 参数类型1
 * var1 实际资源1
 * Type2 参数类型2
 * var2 实际资源2
 */
#define SET_AUTO_FREE_TRIGGLE_X2(hanle_ptr, Type1, var1, Type2, var2) \
	class MAKE_AUTO_FREE_TRIGGLE_CLASS(__LINE__) { \
		public: \
				MAKE_AUTO_FREE_TRIGGLE_CLASS(__LINE__) (Type1 arg1, Type2 arg2) { \
					this->arg1_ = arg1; \
					this->arg2_ = arg2; \
				} \
		~MAKE_AUTO_FREE_TRIGGLE_CLASS(__LINE__) () { \
			hanle_ptr(this->arg1_, this->arg2_); \
		} \
		private: \
			Type1 arg1_; \
			Type2 arg2_; \
	}; \
	MAKE_AUTO_FREE_TRIGGLE_OBJ(__LINE__, var1, var2)

// 带单个参数的资源释放函数
/**
 * hanle_ptr 资源释放函数名
 * Type1 参数类型1
 * var1 实际资源1
 * Type2 参数类型2
 * var2 实际资源2
 * Type3 参数类型3
 * var3 实际资源3
 */
#define SET_AUTO_FREE_TRIGGLE_X3(hanle_ptr, Type1, var1, Type2, var2, Type3, var3) \
	class MAKE_AUTO_FREE_TRIGGLE_CLASS(__LINE__) { \
		public: \
				MAKE_AUTO_FREE_TRIGGLE_CLASS(__LINE__) (Type1 arg1, Type2 arg2, Type3 arg3) { \
					this->arg1_ = arg1; \
					this->arg2_ = arg2; \
					this->arg3_ = arg3; \
				} \
		~MAKE_AUTO_FREE_TRIGGLE_CLASS(__LINE__) () { \
			hanle_ptr(this->arg1_, this->arg2_, this->arg3_); \
		} \
		private: \
			Type1 arg1_; \
			Type2 arg2_; \
			Type3 arg3_; \
	}; \
	MAKE_AUTO_FREE_TRIGGLE_OBJ(__LINE__, var1, var2, var3)

#endif //AUTO_FREE_X_HELPER_H_
```
## 1.4 示例代码
```
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <iostream>

#include "auto_free_x_helper.h"

using namespace std;

class Tester1 {
};

void tester1_free_handle(Tester1*  handle, int arg2) {
	delete handle;
	cout << "handle: " << __FUNCTION__ << ";arg2=" << arg2 <<  endl;
}

class Tester2 {
};

void tester2_free_handle(Tester2*  handle, int arg2, char* arg3) {
	delete handle;
	cout << "handle: " << __FUNCTION__ << ";arg2=" << arg2  << "; arg3=" << arg3 <<  endl;
}
int main(int argc, char* argv[]) {
	int fd = open("test.txt", O_RDONLY);
	SET_AUTO_FREE_TRIGGLE_X1(close, int, fd);

	Tester1* tester1 = new Tester1();
	SET_AUTO_FREE_TRIGGLE_X2(tester1_free_handle, Tester1*, tester1, int, 1);

	Tester2* tester2 = new Tester2();
	SET_AUTO_FREE_TRIGGLE_X3(tester2_free_handle, Tester2*, tester2, int, 3, char*, "day day up");

	return 0;
}
```

